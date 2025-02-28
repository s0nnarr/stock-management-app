const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    endpoint: { 
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    requestData: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ip: {
        type: String,
        required: true
    }
});

const auditModel = mongoose.model('AuditLog', AuditSchema);
module.exports = auditModel;