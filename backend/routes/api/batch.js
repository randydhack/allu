const express = require("express");
const router = express.Router();
const { Batch, UserDesign, Design, Cart } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

//get all batches
router.get("/", async (req, res) => {
  const batches = await Batch.findAll();
  if (!batches) {
    return res.status(500).json({ error: "Products not found bad request" });
  }
  return res.json(batches);
});

//get a single batch
router.get("/:batchId", async (req, res) => {
  const batch = await Batch.findOne({
    where: {
      id: req.params.batchId,
    },
  });

  if (!batch) {
    return res.status(404).json({
      message: "Product could not be found",
      statusCode: 404,
    });
  }

  if (!batch.userDesignId) {
    const design = await Design.findAll({
      attributes: ["id", "design_url", "text_layers", "design_price"],
      where: { id: batch.designId },
    });
    return res.json({
      batch,
      design,
    });
  }

  const userDesign = await UserDesign.findAll({
    attributes: ["id", "img_url"],
    where: { id: batch.userDesignId },
  });

  return res.json({
    batch,
    userDesign,
  });
});

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

    let newBatch = await Batch.create({
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

module.exports = router;
