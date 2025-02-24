const userModel = require('../models/userModel')
const { createAccessToken, createRefreshToken } = require('../functions/createTokens');

//Cookies options (in production -> secure:true)
const refreshOptions = {
    httpOnly: true,
    maxAge: 60000 * 15,
    sameSite: "none",
    secure: false,
};
const accessOptions = {
    httpOnly: true,
    maxAge: 60000 * 5,
    sameSite: "none",
    secure: false,
};

const postUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const User = await userModel.signup(email, password, name)

        //Send token cookies
/*         const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions) */

        res.status(200).json('Account created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllUsers = async (req, res) => {
    // in production -> only admins
    try {
        const Users = await userModel.find()
        res.status(200).json(Users)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postUser, getAllUsers }