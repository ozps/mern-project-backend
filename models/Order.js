const mongoose = require('mongoose')
const { Schema } = mongoose
const orderSchema = new Schema(
    {
        orderList: [],
        orderPrice: Number,
        orderAmount: Number,
        orderDated: Date
    },
    { versionKey: false }
)

module.exports = mongoose.model('Order', orderSchema, 'Order')
