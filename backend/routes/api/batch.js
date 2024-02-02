const express = require("express");
const router = express.Router();
const { Batch, UserDesign, Design, Cart, Product } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

//Get all batches
// checked
router.get("/", async (req, res) => {
  const { user } = req;
  if (user.admin) {
    const batches = await Batch.findAll();
    if (!batches) {
      return res.status(500).json({ error: "Batches not found bad request" });
    }
    return res.json(batches);
  }
  return res.json([]);
});

//Get a single batch
// checked
router.get("/:batchId", async (req, res) => {
  const { user } = req;
  if (user) {
    const batch = await Batch.findOne({
      where: {
        id: req.params.batchId,
      },
      include: [
        {
          model: Cart,
        },
        {
          model: Product,
          attributes: { exclude: ["colors"] },
        },
        {
          model: Design,
        },
        {
          model: UserDesign,
        },
      ],
    });

    if (!batch) {
      return res.status(404).json({
        message: "Batch could not be found",
        statusCode: 404,
      });
    }

    return res.json({
      batch,
    });
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Create a batch
// checked
// This is will require authentication because
// batch --> cart --> user
// each user has a unique cart
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  if (user) {
    const cart = await Cart.findOne({
      where: { userId: user.id },
    });

    const {
      productId,
      orderId,
      xs,
      s,
      m,
      l,
      xl,
      xxl,
      xxxl,
      xxxxl,
      xxxxxl,
      designId,
      userDesignId,
      note,
      color,
      total_price,
    } = req.body;

    if (!productId || !cart) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          productId: "Product id is required",
        },
      });
    }

    const newBatch = await Batch.create({
      productId: productId,
      orderId: orderId,
      cartId: cart.id,
      xs: xs,
      s: s,
      m: m,
      l: l,
      xl: xl,
      xxl: xxl,
      xxxl: xxxl,
      xxxxl: xxxxl,
      xxxxxl: xxxxxl,
      designId: designId,
      userDesignId: userDesignId,
      note: note,
      color: color,
      total_price: total_price
    });
    res.status = 201;
    res.json(newBatch);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Update a batch
// checked
router.put("/:batchId", requireAuth, async (req, res) => {
  const { user } = req;

  let batch = await Batch.findOne({
    where: { id: req.params.batchId },
    include: Cart,
  });

  if (!batch) {
    res.status(404);
    return res.json({
      message: "Batch couldn't be found",
      statusCode: 404,
    });
  }

  if (user.id == batch.Cart.userId) {
    const {
      productId,
      orderId,
      cartId,
      xs,
      s,
      m,
      l,
      xl,
      xxl,
      xxxl,
      xxxxl,
      xxxxxl,
      designId,
      userDesignId,
      note,
      color,
      total_price
    } = req.body;

    if (!productId) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          productId: "Product id is required",
        },
      });
    }

    batch.productId = productId;
    batch.orderId = orderId;
    batch.cartId = cartId;
    batch.xs = xs;
    batch.s = s;
    batch.m = m;
    batch.l = l;
    batch.xl = xl;
    batch.xxl = xxl;
    batch.xxxl = xxxl;
    batch.xxxxl = xxxxl;
    batch.xxxxxl = xxxxxl;
    batch.designId = designId;
    batch.userDesignId = userDesignId;
    batch.note = note;
    batch.color = color;
    batch.total_price = total_price;

    await batch.save();

    res.status = 200;
    res.json(batch);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Delete a batch
// checked
router.delete("/:batchId", requireAuth, async (req, res) => {
  const { user } = req;

  let batch = await Batch.findOne({
    where: { id: req.params.batchId },
    include: Cart,
  });

  if (!batch) {
    res.status(404);
    return res.json({
      message: "Batch couldn't be found",
      statusCode: 404,
    });
  }

  const cart = batch.Cart;

  if (user) {
    await batch.destroy();

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
