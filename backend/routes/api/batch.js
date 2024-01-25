const express = require("express");
const router = express.Router();
const { Batch, UserDesign, Design } = require("../../db/models");

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

module.exports = router;
