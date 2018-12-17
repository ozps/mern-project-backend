const mongoose = require('mongoose')
const { Router } = require('express')
const router = new Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

router.post('/sign_up', async (req, res) => {
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const user = new User({
                username: req.body.username,
                password: hash,
                salt: salt
            })
            user.save()
        })
    })
    res.status(200).send({ message: 'Success' })
})

router.post('/sign_in', (req, res) => {
    User.find({}, (error, users) => {
        var user = undefined
        var checkPass = true
        if (error) throw error
        for (let x in users) {
            if (users[x].username === req.body.username) {
                user = users[x]
                checkPass = bcrypt.compareSync(req.body.password, user.password)
                break
            }
        }
        if (user !== undefined && checkPass) {
            const token = jwt.sign({ data: user._id }, keys.secretKey, {
                expiresIn: 60 * 60
            })
            res.send({ message: 'Success', token: token })
        } else res.send({ message: 'Fail' })
    })
})

module.exports = router
