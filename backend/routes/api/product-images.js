const express = require("express");
const router = express.Router();
const { ProductImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

//get all product images
router.get("/", async (req, res) => {
  const productImages = await ProductImage.findAll();

  if (!productImages) {
    return res
      .status(500)
      .json({ error: "Product Images not found bad request" });
  }
  return res.json(productImages);
});
//get a single product
router.get("/:productImageId", async (req, res) => {
  const productImage = await ProductImage.findOne({
    where: {
      id: req.params.productImageId,
    },
  });

  if (!productImage) {
    return res.status(404).json({
      message: "Product Image could not be found",
      statusCode: 404,
    });
  }

  return res.json(productImage);
});

// Create a product-image
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;

  if (user.admin == true) {
    const { productId, img_url, description, color } = req.body;

    if (!productId || !img_url || !description || !color) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          productId: "Product id is required",
          img_url: "Image url is required",
          description: "Description is required",
          color: "Color is required",
        },
      });
    }

    const newProductImage = await ProductImage.create({
      productId: productId,
      img_url: img_url,
      description: description,
      color: color,
    });

    res.status = 201;
    res.json(newProductImage);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Update a product image.
router.put("/:productImageId", requireAuth, async (req, res) => {
  const { user } = req;

  if (user.admin == true) {
    const productImage = await ProductImage.findOne({
      where: { id: req.params.productImageId },
    });

    if (!productImage) {
      res.status(404);
      return res.json({
        message: "Product Image couldn't be found",
        statusCode: 404,
      });
    }

    const { productId, img_url, description, color } = req.body;

    if (!productId || !img_url || !description || !color) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          productId: "Product id is required",
          img_url: "Image url is required",
          description: "Description is required",
          color: "Color is required",
        },
      });
    }

    productImage.productId = productId;
    productImage.img_url = img_url;
    productImage.description = description;
    productImage.color = color;

    await productImage.save();

    res.status = 200;
    res.json(productImage);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Delete a product image
router.delete("/:productImageId", requireAuth, async (req, res) => {
  const { user } = req;

  if (user.admin) {
    const productImage = await ProductImage.findOne({
      where: { id: req.params.productImageId },
    });

    if (!productImage) {
      res.status(404);
      return res.json({
        message: "Product Image couldn't be found",
        statusCode: 404,
      });
    }

    await productImage.destroy();

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
