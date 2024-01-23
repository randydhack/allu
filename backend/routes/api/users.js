const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
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

    if (!firstName || !lastName || !email || !password ||
      firstName === "" || lastName === "" || email === "" || password === "") {
      return res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "email": "Invalid email",
          "username": "Username is required",
          "firstName": "First Name is required",
          "lastName": "Last Name is required"
        }
      })
    }

    let user = await User.signup({ firstName, lastName, email, password });
    
    let token = await setTokenCookie(res, user);

    user = user.toJSON()

    user.token = token

    delete user.createdAt
    delete user.updatedAt
    
    return res.json(user);
  }
);

module.exports = router;