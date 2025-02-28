const auditLog = require('../models/auditModel');

const auditMiddleware = async (req, res, next) => {
    try {
        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            const auditEntry = new auditLog({
                user: req.user ? req.user._id : null,
                endpoint: req.originalUrl,
                method: req.method,
                requestData: req.body,
                ip: req.ip
            });

            await auditEntry.save();
        }
    } catch (err) {
        console.error('Audit log err: ', err);
    };
    next();
};

module.exports = auditMiddleware;