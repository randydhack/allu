const express = require('express');
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Product, ProductImage } = require('../../db/models')
const { Op } = require("sequelize");

//CREATE and EDIT product routes not needed at the moment but can create

//get all products
router.get(
    '/',
    async (req, res) => {
        const products = await Product.findAll({
            include: [{
                model: ProductImage,
            }],
        });
        if(!products) {
            return res.status(500).json({error: 'Products not found bad request'})
        }
        return res.json(products)
    }
)
//get a single product
router.get(
    '/:productId',
    async (req, res) => {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            },
            include: [{
                model: ProductImage,
            }],
        })

        if(!product) {
            return res.status(404).json({
                'message': "Product could not be found",
                "statusCode": 404,
            })
        }

        return res.json(product)
    }
)

// Create a product
router.post("/", requireAuth, async (req, res) => {
    const { user } = req;
  
    if (user.admin == true) {
      const { name, colors, size, description, price } = req.body;
  
      if (!name || !colors || !description || !size || !price) {
        return res.json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
            name: "Name is required",
            colors: "Colors is required",
            size: "Size is required",
            description: "Description is required",
            price: "Price is required"
          },
        });
      }
  
      const newProduct = await Product.create({
        name: name,
        colors: colors,
        size: size,
        description: description,
        price: price
      });
  
      res.status = 201;
      res.json(newProduct);
    } else {
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
  });

  // Update a product
router.put("/:productId", requireAuth, async (req, res) => {
    const { user } = req;
  
    if (user.admin == true) {
      const product = await Product.findOne({
        where: { id: req.params.productId },
      });
  
      if (!product) {
        res.status(404);
        return res.json({
          message: "Product couldn't be found",
          statusCode: 404,
        });
      }
  
      const { name, colors, size, description, price } = req.body;
  
      if (!name || !colors || !description || !size || !price) {
        return res.json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
            name: "Name is required",
            colors: "Color is required",
            size: "Size is required",
            description: "Description is required",
            price: "Price is required"
          },
        });
      }
  
      product.name = name;
      product.colors = colors;
      product.size = size;
      product.description = description;
      product.price = price;
  
      await product.save();
  
      res.status = 200;
      res.json(product);
    } else {
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
  });

// Delete a product
router.delete("/:productId", requireAuth, async (req, res) => {
    const { user } = req;
  
    if (user.admin) {
      const product = await Product.findOne({
        where: { id: req.params.productId },
      });
  
      if (!product) {
        res.status(404);
        return res.json({
          message: "Product couldn't be found",
          statusCode: 404,
        });
      }
  
      await product.destroy();
  
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
