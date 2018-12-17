const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema(
    {
        username: String,
        password: String,
        salt: String
    },
    { versionKey: false }
)

module.exports = mongoose.model('User', userSchema, 'User')
