const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const SHA256 = require('sha256')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

router.post('/sign_up', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: SHA256(req.body.password)
    })
    await user.save()
    res.status(200).send({ message: 'Success' })
})

router.post('/sign_in', (req, res) => {
    User.find({}, (error, users) => {
        var user = undefined
        if (error) throw error
        for (let x in users) {
            if (
                users[x].username === req.body.username &&
                users[x].password === SHA256(req.body.password)
            ) {
                user = users[x]
                break
            }
        }
        if (user !== undefined) {
            const token = jwt.sign({ data: user._id }, keys.secretKey, {
                expiresIn: 60 * 60
            })
            res.send({ message: 'Success', token: token })
        } else res.send({ message: 'Fail' })
    })
})

module.exports = router
