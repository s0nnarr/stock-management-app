const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const express = require('express');
const { createAccessToken } = require('../functions/createTokens')

const app = express();
app.use(cookieParser())

const verifyRefreshToken = (res, req) => {
    const refreshToken = req.cookies.refreshToken
    let accessTokenCreated = false

    //Check if there is a refresh token cookie
    if (!refreshToken) {
        res.status(403).json({ error: "ExpiredRefreshToken" })
    } else {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                //Check if the token is expired
                if (err.name === 'TokenExpiredError') {
                    res.status(403).json({ error: "ExpiredRefreshToken" })
                    //Any other error
                } else {
                    res.status(401).json(`JWT Verify Refresh error: ${err.name}`)
                }
            } else {
                //Create new access token
                const User = await userModel.findById(decoded.id)
                if (User) {
                    const accessToken = createAccessToken(decoded.id)
                    res.cookie('accessToken', accessToken, { maxAge: 60000 * parseInt(process.env.JWT_ACCESS_TIME) })
                    accessTokenCreated = true
                    req.headers['authorization'] = `Bearer ${accessToken}`;
                } else {
                    res.status(401).json('Invalid Token')
                }
            }
        })
    }
    return accessTokenCreated
}

module.exports = verifyRefreshToken