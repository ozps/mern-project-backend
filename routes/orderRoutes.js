const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const Order = require('../models/Order')
const Item = require('../models/Item')

router.post('/place_order', async (req, res) => {
    const decreaseAmount = async id => {
        await Item.findById(mongoose.Types.ObjectId(id), (error, item) => {
            if (error) throw error
            console.log(item)
            Item.findByIdAndUpdate(
                mongoose.Types.ObjectId(id),
                { itemAmount: item.itemAmount - 1 },
                (error, item2) => {
                    if (error) throw error
                }
            )
        })
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

        //Fix Decrease
        for (x in orderL) {
            decreaseAmount(orderL[x].id)
        }
        // for (x in orderL) {
        //     Item.findByIdAndUpdate(
        //         mongoose.Types.ObjectId(orderL[x].id),
        //         { itemAmount: orderL[x].itemAmount-- },
        //         (error, item) => {
        //             if (error) throw error
        //             res.status(200).send(item)
        //         }
        //     )
        // }
        // for (x in orderL) {
        //     let temp = 0
        //     Item.findById(
        //         mongoose.Types.ObjectId(orderL[x].id),
        //         (error, item) => {
        //             if (error) throw error
        //             temp = item.itemAmount
        //             Item.findByIdAndUpdate(
        //                 mongoose.Types.ObjectId(orderL[x].id),
        //                 { itemAmount: temp - 1 }
        //             )
        //         }
        //     )
        // }
        res.status(200).send({ message: 'Success' })
    } else {
        res.status(200).send({ message: 'Fail' })
    }
})

module.exports = router
