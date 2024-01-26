const express = require("express");
const router = express.Router();
const { Batch, Cart } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Get all batch items in cart
// checked
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    let cart = await Cart.findAll({
      where: {
        userId: user.id,
      },
      include: Batch,
    });

    if (!cart) {
      return res.status(500).json({ error: "Cart not found bad request" });
    }

    return res.json({
      cart,
    });
  }
});

module.exports = router;
