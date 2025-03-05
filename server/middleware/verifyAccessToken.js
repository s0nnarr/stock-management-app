const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const verifyRefreshToken = require('../functions/verifyRefreshToken');

const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        const user = await verifyRefreshToken(req, res);
        if (user) {
            req.user = user;
            return next();
        } else {
            return
        }
    }

    //Decode jwt
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
        if (err) {
            //Expired token error
            if (err.name === 'TokenExpiredError') {
                const user = await verifyRefreshToken(req, res);
                if (user) {
                    req.user = user;
                    return next();
                } else {
                    return
                }
            }
            //Other error
            return res.status(401).json({ error: `JWT Verify Access error: ${err.name}` });
        }

        const user = await userModel.findById(decoded.id).select('-password');
        if (user) {
            req.user = user;
            return next();
        }
        //User doesn't exist
        return res.status(401).json({ error: "Invalid Token" });
    });
};

module.exports = verifyAccessToken;
