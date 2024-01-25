const express = require("express");
const router = express.Router();
const { Order, Batch } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.findAll();

  if (!orders) {
    return res.status(500).json({ error: "Orders not found bad request" });
  }
  return res.json(orders);
});

// Get all user orders
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    const orders = await Order.findAll({
      where: { userId: user.id },
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

router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  if (user) {
    const {
      userId,
      address,
      special_request,
      quote,
      workforce_race,
      processed,
    } = req.body;

    if (!userId || !address || !quote || !workforce_race || !processed) {
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

    let newOrder = await Order.create({
      userId: user.id,
      address: address,
      special_request: special_request,
      quote: quote,
      workforce_race: workforce_race,
      processed: processed,
    });

    const cart = await cart.findOne({
      where: { userId: user.id },
      include: { Batch }
    });

    for (let i = 0; i < batches; i++) {
      // const curr = batches[i]
      // await curr.update({
      //   orderId: newOrder.id,
      //   cartId: null,
      // });
      batches[i].orderId = newOrder.id;
      batches[i].cartId = null;

      batches[i].save();
    }

    res.status = 201;
    res.json({ newOrder, Batches: batches });
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

module.exports = router;
