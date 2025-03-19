const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    sales: [{
        inventory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory',
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    }],

    customer: {
        type: String,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'processed', 'cancelled', 'shipped', 'delivered', 'refunded'],
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now

    }
})

const orderModel = mongoose.model('Order', OrderSchema);
module.exports = orderModel; 
