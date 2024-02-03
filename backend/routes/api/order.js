const express = require("express");
const router = express.Router();
const { Order, Batch, Cart, Design, Product } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

// Get all orders
router.get("/", async (req, res) => {
  const { user } = req;

  if (user.admin) {
    const orders = await Order.findAll({
      include: [
        {
          model: Batch,
          include: [
            {
              model: Design,
            },
            {
              model: Product,
              attributes: { exclude: ["colors", "createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      raw: true,
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
    console.log("what is happening HERE")
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Batch,
          include: [
            {
              model: Design,
            },
            {
              model: Product,
              attributes: { exclude: ["colors", "createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      raw: true,
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
router.post("/", requireAuth, async (req, res, next) => {
  const { user } = req;
  if (user) {
    const { address, special_request, quote, workforce_race, processed, firstName, lastName, phone, email, delivery } =
    req.body;
    
    console.log("ASDFASDFASDFASDFASDFASDFASDFASSDFASDFASDFASDFASDFAS")
      console.log(address, special_request, quote, workforce_race, processed, phone, firstName, lastName, email, delivery)

      if (quote == null || workforce_race == null || processed == null) {
        const err = new Error("Creating order failed");
        err.status = 403;
        err.title = "Creating order failed";
        err.errors = { 
          quote: "quote does not exist", 
          workforce_race: "quote does not exist", 
          processed: "processed does not exist", 
          delivery: "delivery does not exist", 
        };
        err.message = "Invalid field";
        err.statusCode = 403;
        return next(err);
      }

    const newOrder = await Order.create({
      userId: user.id,
      firstName,
      lastName,
      address: address,
      email,
      phone: Number(phone),
      special_request: special_request,
      quote: Number(quote),
      workforce_race: false,
      processed: processed,
      delivery: delivery
    });

    const cart = await Cart.findOne({
      where: { userId: user.id },
      include: Batch,
    });

    for (let i = 0; i < cart.Batches.length; i++) {
      const curr = cart.Batches[i];
      console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK")

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
