const express = require("express");
const router = express.Router();
const { Order, Batch } = require("../../db/models");
const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");

// Fetches all orders for current user. NOTE: try to remove the null values form the batches
router.get("/", requireAuth, async (req, res, next) => {
  const { user } = req;
  const orders = await Order.findAll({
    where: { userId: user.id },
    include: {
      model: Batch,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });

  res.status(200).json(orders);
});

// Get user's order by order id
router.get("/:orderId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { orderId } = req.params;
  const order = await Order.findOne({
    where: { userId: user.id, id: orderId },
    include: {
      model: Batch,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });

  if (!order) {
    const err = new Error("Order does not exist");
    err.status = 404;
    return next(err);
  }

  res.status(200).json(order);
});

// Create an order
router.post("/", requireAuth, async (req, res, next) => {

  const { address } = req.body;

  const order = await Order.create(address);

  const cart = await cart.findOne({ where: { userId: user.id }, include: { method: Batch } });

  for (let i = 0; i < cart.Batch.length; i++) {

    const curr = await Batch.findByPk(cart.Batch[i].id);

    await curr.update({
        orderId: order.id,
        cartId: null
    })
  }

  res.status(200).json
});

module.exports = router;
