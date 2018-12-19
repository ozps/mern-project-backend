const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const Order = require('../models/Order')
const Item = require('../models/Item')

router.post('/place_order', async (req, res) => {
    const decreaseAmount = async id => {
        try {
            await Item.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
                $inc: { itemAmount: -1 }
            })
        } catch (error) {
            console.error(error)
        }
    }
    var orderL = req.body.orderList
    var stock = true
    var amount = 0
    var price = 0
    for (x in orderL) {
        if (orderL[x].itemAmount > 0) {
            amount++
            price += orderL[x].itemPrice
        } else {
            stock = false
            break
        }
    }
    if (stock) {
        const order = new Order({
            orderList: req.body.orderList,
            orderPrice: price,
            orderAmount: amount,
            orderDated: req.body.orderDated
        })
        await order.save()

        for (let x in orderL) {
            decreaseAmount(orderL[x]._id)
        }
        res.status(200).send({ message: 'Success' })
    } else {
        res.status(200).send({ message: 'Fail' })
    }
})

module.exports = router
