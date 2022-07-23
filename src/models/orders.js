const mongoose = require('mongoose');
const schema = mongoose.Schema;


const orderSchema = new schema({
    email_id: {
        type:String,
        required:true,
    },
    menuItem: {
        type:String,
        required:true,
    },
    quantity: {
        type:String,
        required:true,
    },
    cost: {
        type:String,
        required:true
    }
}, {timestamps:true})


const order = mongoose.model('order', orderSchema);

module.exports = {order};