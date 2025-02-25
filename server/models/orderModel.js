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
        }
    }],

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['in progress', 'opened', 'cancelled', 'completed'],
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