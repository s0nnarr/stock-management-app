const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    sales: [{
        inventory: {
            type: mongoose.Types.ObjectId,
            ref: 'Inventory',
            required: true
        },

        quantity: {
            type: Number,
            required: true
        }

    }],

    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now

    }
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = OrderSchema 