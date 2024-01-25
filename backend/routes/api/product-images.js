const express = require('express');
const router = express.Router();
const { Product } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//individual product images route can be added later since each product query already includes their data







module.exports = router;
