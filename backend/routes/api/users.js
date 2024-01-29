const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Cart } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const bcrypt = require("bcryptjs");
const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Invalid First Name, must include 2 letters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Innvalid Last Name, must include 2 letters"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Invalid Password, must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const existingEmail = await User.findOne({
    where: { email: email },
  });

  if (existingEmail) {
    const err = new Error("Sign up failed");
    err.status = 403;
    err.title = "Sign up failed";
    err.errors = { email: "User with that email already exists" };
    err.message = "Invalid field";
    err.statusCode = 403;
    return next(err);
  }

  let user = await User.signup({ firstName, lastName, email, password });

  let token = await setTokenCookie(res, user);

  user = user.toJSON();

  user.token = token;

  await Cart.create({
    userId: user.id,
  });

  delete user.createdAt;
  delete user.updatedAt;

  return res.json({ user: user });
});

// Change Password
router.put("/update-password", requireAuth, async (req, res, next) => {
  const { password, newPassword } = req.body;

  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      include: ["hashedPassword"],
    },
  });

  if (!user || !user.validatePassword(password)) {
    const err = new Error("Invalid password");
    err.status = 401;
    return next(err);
  }

  const newHashedPassword = bcrypt.hashSync(newPassword);

  await user.update({ hashedPassword: newHashedPassword });

  res.status(200).json(user.toSafeObject());
});

router.put("/update-email", requireAuth, async (req, res, next) => {
  const { password, newEmail } = req.body;

  // Throw error is user enter same email
  if (req.user.email === newEmail) {
    return res.json({
      message: { email: "You are already using this email" },
      statusCode: 401,
    });
  }

  // Find a user to check if that email already exist
  const checkEmail = await User.findOne({ where: { email: newEmail } });

  // If user is already found with that email, throw an error.
  if (checkEmail) {
    return res.json({
      message: {
        email:
          "A user already exist with that email. Please try another email.",
      },
      statusCode: 401,
    });
  }

  // Finds the current user and compare the password before allowing to update the email.
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      include: ["hashedPassword"],
    },
  });

  if (!user.validatePassword(password)) {
    return res.json({
      message: { password: "Invalid Password" },
      statusCode: 401,
    });
  }

  await user.update({ email: newEmail });

  res.status(200).json(user.toSafeObject());
});

module.exports = router;
