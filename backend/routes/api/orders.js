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


router.get("/:orderId", async (req, res, next) => {
    const { user } = req;
    const { orderId } = req.params
  const order = await Order.findOne({
    where: {userId: user.id, id: orderId},
    include: {
        model: Batch,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
  });

  if (!order) {
    const err = new Error("Order does not exist");
    err.status = 404;
    return next(err);
  }

  res.status(200).json(order);
});

module.exports = router;
