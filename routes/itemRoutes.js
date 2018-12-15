const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const Item = require('../models/Item')

router.get('/get_all_items', (req, res) => {
    Item.find({}, (error, items) => {
        if (error) throw error
        res.status(200).send(items)
    })
})

router.get('/get_detail_item/:id', (req, res) => {
    Item.findById(mongoose.Types.ObjectId(req.params.id), (error, item) => {
        if (error) throw error
        res.status(200).send(item)
    })
})

router.post('/add_new_item', async (req, res) => {
    const item = new Item({
        itemName: req.body.itemName,
        itemDesc: req.body.itemDesc,
        itemPrice: req.body.itemPrice,
        itemAmount: req.body.itemAmount,
        itemReleased: req.body.itemReleased,
        itemPicture: req.body.itemPicture
    })
    await item.save()
    console.log(item)
    res.status(200).send({ message: 'Success' })
})

router.post('/remove_item', (req, res) => {
    Item.findByIdAndDelete(
        mongoose.Types.ObjectId(req.body.id),
        (error, item) => {
            if (error) throw error
        }
    )
    res.status(200).send({ message: 'Success' })
})

router.post('/update_price_of_item', (req, res) => {
    Item.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body.id),
        { itemPrice: req.body.itemPrice },
        (error, item) => {
            if (error) throw error
        }
    )
    res.status(200).send({ message: 'Success' })
})

router.post('/search_items', (req, res) => {
    var query = req.body.query.trim()
    var results = []
    Item.find({}, async (error, items) => {
        if (error) throw error
        for (let x in items) {
            desc = items[x].itemDesc !== undefined ? items[x].itemDesc : ''
            name = items[x].itemName !== undefined ? items[x].itemName : ''
            if (desc.includes(query) || name.includes(query)) {
                results.push(items[x])
            }
        }
        await res.status(200).send(results)
    })
})

module.exports = router
