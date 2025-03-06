const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { createAccessToken } = require('../functions/createTokens');

const verifyRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(403).json({ error: "ExpiredRefreshToken" });
            return null
        }

        //Decode jwt to return user
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });

        const user = await userModel.findById(decoded.id);
        if (!user) {
            res.status(401).json({ error: "Invalid Token" });
            return null
        }

        //Refresh access token and set cookie
        const accessToken = createAccessToken(user._id);
        res.cookie('accessToken', accessToken, { maxAge: 60000 * parseInt(process.env.JWT_ACCESS_TIME) });
        req.headers['authorization'] = `Bearer ${accessToken}`;

        return user
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(403).json({ error: "ExpiredRefreshToken" });
            return null
        }
        res.status(401).json({ error: `JWT Verify Refresh error: ${err.message}` });
        return null
    }
};

module.exports = verifyRefreshToken;
