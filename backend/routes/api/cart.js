const express = require("express");
const router = express.Router();
const { Batch,  Cart } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Get all batch items in cart
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    let cart = await Cart.findOne({
      where: {
        userId: user.id,
      },
      include: Batch
    });

    if (!cart) {
      return res.status(500).json({ error: "Cart not found bad request" });
    }

    // let batches = await Batch.findAll({
    //   where: { cartId: cart.id },
    // });

    // if (!batches) {
    //     return res.status(500).json({ error: "Batches not found bad request" });
    //   }
      return res.json({
        cart
        // Cart: batches
    });
  }
});

module.exports = router;