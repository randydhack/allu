const express = require('express');
const router = express.Router();
const { Order, Product } = require('../../db/models')

router.get('/', async (req,res ,next) => {

    const orders = await Order.findAll()

    res.status(200).json(orders)
})

router.get('/:orderId', async (req, res, next) => {

    const order = await Order.findByPk(req.params.orderId)

    if (!order) {
        const err = new Error("Order does not exist")
        err.status = 404
        return next(err)
    }

    res.status(200).json(order)
})

module.exports = router;
