const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderedBy: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderDetails: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentTiming: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order