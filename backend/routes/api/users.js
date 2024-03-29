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
    .isLength({ min: 1 })
    .withMessage("Invalid First Name, must include 1 letters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Innvalid Last Name, must include 1 letters"),
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
    console.log(err)
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
  const { password, newPassword, confirmedPassword} = req.body;
  const errors = {message: {}}

  if (confirmedPassword !== newPassword) {
    errors.message["match"] = "Password must match the confirmed password"
  }

  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      include: ["hashedPassword"],
    },
  });

  if (!user || !user.validatePassword(password)) {
    errors.message["password"] = "Invalid Password";
  }

  // console.log(errors)
  if (Object.values(errors.message).length) {
    const err = new Error(JSON.stringify(errors.message));
    err.status = 404;
    return next(err);
  }

  const newHashedPassword = bcrypt.hashSync(newPassword);

  await user.update({ hashedPassword: newHashedPassword });

  res.status(200).json(user.toSafeObject());
});

router.put("/update-email", requireAuth, async (req, res, next) => {
  const { password, newEmail } = req.body;
  const errors = {statusCode: 401, message: {}}

  // Find a user to check if that email already exist
  const checkEmail = await User.findOne({ where: { email: newEmail } });

  // If user is already found with that email, throw an error.
  if (checkEmail) {
    errors.message['email'] = "A user already exist with that email. Please try another email."
  }

  // Finds the current user and compare the password before allowing to update the email.
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      include: ["hashedPassword"],
    },
  });

  if (!user.validatePassword(password)) {
    errors.message["password"] = "Invalid Password"
  }

  if (Object.values(errors.message).length) {
    return res.json(errors)
  }

  await user.update({ email: newEmail });

  res.status(200).json(user.toSafeObject());
});

module.exports = router;
