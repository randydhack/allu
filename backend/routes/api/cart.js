const express = require("express");
const router = express.Router();
const { Batch, UserDesign, Design, Cart } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Get all batch items in cart
router.get('/', requireAuth, async(req, res) => {
    const {user} = req;
    
    if (user) {

    }
})