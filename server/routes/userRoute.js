const express = require('express')
const router = express.Router()
const {
    postUser,
    getAllUsers,
} = require('../controllers/userController')

router
    .post('/', postUser)
    .get('/', getAllUsers)

module.exports = router 