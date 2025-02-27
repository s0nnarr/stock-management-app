const userModel = require('../models/userModel')
const { createAccessToken, createRefreshToken } = require('../functions/createTokens');
const { accessOptions, refreshOptions } = require('../config/cookiesConfig')

const postUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const User = await userModel.signup(email, password, name)

        //Send token cookies
        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const logUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await userModel.login(email, password)

        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account logged')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const signoutUser = async (req, res) => {
    try {
        res.cookie('accessToken', '', { maxAge: 1, httpOnly: true, sameSite: 'strict', secure: true })
        res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true, sameSite: 'strict', secure: true })
        res.status(200).json('Signed out')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const putUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.user.id, req.body)
        res.status(200).json("User updated successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.user._id);
        res.status(200).json("User deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//doar pt test verifyRole(nu trb)
const getAllUsers = async (req, res) => {
    try {
        const Users = await userModel.find()
        res.status(200).json(Users)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postUser, logUser, signoutUser, putUser, deleteUser, getAllUsers }