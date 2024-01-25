const express = require('express');
const router = express.Router();
const { Product, ProductImage } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const productimage = require('../../db/models/productimage');



//get all products
router.get(
    '/',
    async (req, res) => {

        const products = await Product.findAll({
            include: [{
                model: ProductImage,
            }],
            // attributes: ['id', 'name', 'colors', 'size', 'description', 'price']
        });
        if(!products) {
            return res.status(500).json({error: 'Products not found bad request'})
        }
        return res.json(products)
    }
)


module.exports = router;
