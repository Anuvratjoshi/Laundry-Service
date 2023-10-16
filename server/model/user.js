const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    address: {
        type: Array,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

const User = mongoose.model("User", userSchema)
module.exports = User