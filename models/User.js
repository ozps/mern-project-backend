const mongoose = require('mongoose')
const SHA256 = require('crypto-js/sha256')
const { Schema } = mongoose
const userSchema = new Schema({
    username: String,
    password: String,
    salt: String
})

module.exports = mongoose.model('User', userSchema)
