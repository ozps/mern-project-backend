const mongoose = require('mongoose')
const { Schema } = mongoose
const itemSchema = new Schema(
    {
        itemName: String,
        itemDesc: String,
        itemPrice: Number,
        itemAmount: Number,
        itemReleased: Date,
        itemPicture: String
    },
    { versionKey: false }
)

module.exports = mongoose.model('Item', itemSchema, 'Item')
