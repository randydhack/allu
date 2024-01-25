const express = require("express");
const router = express.Router();
const { Order, Batch } = require("../../db/models");

const { requireAuth } = require("../../utils/auth");

router.get("/", requireAuth, async (req, res, next) => {
    const { user } = req
  const orders = await Order.findAll({
    where: { userId: user.id},
    include: {
        model: Batch
    }
  }
  );

  res.status(200).json(orders);
});

router.get("/:orderId", async (req, res, next) => {
  const order = await Order.findByPk(req.params.orderId);

  if (!order) {
    const err = new Error("Order does not exist");
    err.status = 404;
    return next(err);
  }

  res.status(200).json(order);
});

module.exports = router;
