const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Invalid First Name, must include 2 letters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Innvalid Last Name, must include 2 letters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Invalid Password, must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup
  ,
  async (req, res) => {
    const { firstName, lastName, email, password} = req.body;

    const existingEmail = await User.findOne({
      where: { email: email }
    })


    if (existingEmail) {
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }

    let user = await User.signup({ firstName, lastName, email, password });

    let token = await setTokenCookie(res, user);

    user = user.toJSON()

    user.token = token

    delete user.createdAt
    delete user.updatedAt

    return res.json({"user": user});
  }
);

module.exports = router;
