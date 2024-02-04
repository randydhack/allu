const express = require("express");
const router = express.Router();
const { Batch, Cart, Design, Product } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
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
      include: [
        {
          model: Batch,
          include: [
            {
              model: Design,
            },
            {
              model: Product,
              attributes: { exclude: ["colors"] },
            },
          ],
        },
      ],
      raw: true,
    });

    if (!cart) {
      return res.status(500).json({ error: "Cart not found bad request" });
    }

    return res.json(cart);
  }
});

module.exports = router;
