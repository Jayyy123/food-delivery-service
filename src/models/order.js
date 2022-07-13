'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const restaurantSchema = require("./restaurants.js")

const OrderSchema = new schema({
    restaurant: {
        type: [restaurantSchema],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    },
    email: {
        type: String,
        required: true
    }
})

const Order = mongoose.model('Order', OrderSchema);


module.exports = Order;