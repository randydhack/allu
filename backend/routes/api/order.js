const express = require("express");
const router = express.Router();
const { Order, Batch, Cart } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Get all orders
router.get("/", async (req, res) => {
  const { user } = req;

  if (user.admin) {
    const orders = await Order.findAll({
      include: Batch,
    });
    if (!orders) {
      return res.status(500).json({ error: "Orders not found bad request" });
    }
    return res.json(orders);
  }

  return res.json([]);
});

// Get all user orders
router.get("/user", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: Batch,
    });

    if (!orders) {
      return res.status(500).json({ error: "Orders not found bad request" });
    }

    return res.json(orders);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Create orders and attach batches to orders for order history
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  if (user) {
    const { address, special_request, quote, workforce_race, processed } =
      req.body;

    if (!address || !quote || !workforce_race || !processed) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          userId: "User id is required",
          address: "Address is required",
          quote: "Quote is required",
          workforce_race: "Workforce race is required",
          processed: "Processed is required",
        },
      });
    }

    const newOrder = await Order.create({
      userId: user.id,
      address: address,
      special_request: special_request,
      quote: quote,
      workforce_race: workforce_race,
      processed: processed,
    });

    const cart = await Cart.findOne({
      where: { userId: user.id },
      include: Batch,
    });

    for (let i = 0; i < cart.Batches.length; i++) {
      const curr = cart.Batches[i];

      curr.orderId = newOrder.id;
      curr.cartId = null;

      await curr.save();
    }

    res.status = 201;
    res.json({ newOrder, Batches: cart.Batches });
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Delete an order
router.delete("/:orderId", requireAuth, async (req, res) => {
  const { user } = req;

  let order = await Order.findOne({
    where: { id: req.params.orderId },
    include: Batch,
  });

  if (!order) {
    res.status(404);
    return res.json({
      message: "Order couldn't be found",
      statusCode: 404,
    });
  }

  if (user && user.id == order.userId) {
    await order.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

module.exports = router;
