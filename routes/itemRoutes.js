const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const Item = require('../models/Item')

router.get('/get_all_items', (req, res) => {
    Item.find({}, (error, items) => {
        if (error) throw error
        // console.log(items)
        res.status(200).send(items)
    })
})

router.get('/get_detail_item/:id', (req, res) => {
    console.log(req.params.id)
    Item.findById(mongoose.Types.ObjectId(req.params.id), (error, item) => {
        if (error) throw error
        // console.log(item)
        res.status(200).send(item)
    })
})

router.post('/add_new_item', async (req, res) => {
    console.log(req.body)
    const item = new Item({
        itemName: req.body.Name,
        itemDesc: req.body.Desc,
        itemPrice: req.body.Price,
        itemAmount: req.body.Amount,
        itemReleased: req.body.Released,
        itemPicture: req.body.Picture
    })
    await item.save()
    console.log(item)
    res.status(200).send({ message: 'Success' })
})

router.post('/remove_item', (req, res) => {
    console.log(req.body)
    Item.findByIdAndDelete(
        mongoose.Types.ObjectId(req.body.id),
        (error, item) => {
            if (error) throw error
            console.log(item)
            // res.status(200).send(item)
        }
    )
    console.log(item)
    res.status(200).send({ message: 'Success' })
})

router.post('/update_price_of_item', (req, res) => {
    //console.log(req.body)
    Item.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body.id),
        { itemPrice: req.body.price },
        (error, item) => {
            if (error) throw error
            console.log(item)
            // res.status(200).send(item)
        }
    )
    console.log(item)
    res.status(200).send({ message: 'Success' })
})

router.post('/search_items', (req, res) => {
    var query = req.body.query.trim()
    var results = []
    Item.find({}, async (error, items) => {
        if (error) throw error
        // console.log(items)
        for (let x in items) {
            // console.log(items[x])
            // console.log(items[x].itemName)
            // console.log(items[x].itemDesc)
            desc = items[x].itemDesc !== undefined ? items[x].itemDesc : ''
            name = items[x].itemName !== undefined ? items[x].itemName : ''
            if (desc.includes(query) || name.includes(query)) {
                results.push(items[x])
                console.log(results)
            }
        }
        await console.log(results)
        await res.status(200).send(results)
    })
})

//app.use('/', express.static(join(_dirname, '../public')))

module.exports = router
