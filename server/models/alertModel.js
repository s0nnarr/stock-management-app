const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString()
    }
}, {
    timestamps: true
})

const alertModel = mongoose.model('Alert', alertSchema)
module.exports = alertModel