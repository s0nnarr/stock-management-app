const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const express = require('express');
const verifyRefreshToken = require('../functions/verifyRefreshToken')

const app = express();
app.use(cookieParser())

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    //Check if there is any access token
    if (!accessToken) {
        if (verifyRefreshToken(res, req)) {
            next()
        }
    } else {
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
            //Errors:
            if (err) {
                //Error - expired token
                if (err.name === 'TokenExpiredError') {
                    if (verifyRefreshToken(res, req)) {
                        next()
                    }
                    //Any other error
                } else {
                    res.status(401).json(`JWT Verify Access error: ${err.name}`)
                }
                //Give access if there are no errors
            } else {
                const User = await userModel.findById(decoded.id).select('-password')
                if (User) {
                    req.user = User
                    next()
                } else {
                    res.status(401).json('Invalid Token')
                }
            }
        })
    }
}

module.exports = verifyAccessToken