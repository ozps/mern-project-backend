const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const SHA256 = require('sha256')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/sign_up', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: SHA256(req.body.password)
    })
    await user.save()

    // Return Token
    res.status(200).send({ message: 'Success' })
})

router.post('/sign_in', (req, res) => {
    User.find({}, async (error, users) => {
        var check = false
        if (error) throw error
        for (let x in users) {
            if (
                users[x].username === req.body.username &&
                users[x].password === SHA256(req.body.password)
            ) {
                check = true
                break
            }
        }

        // Return Token
        if (check) await res.send({ message: 'Success' })
        else await res.send({ message: 'Fail' })
    })
})

module.exports = router
