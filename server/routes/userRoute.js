const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../middleware/verifyAccessToken')
const verifyRole = require('../middleware/verifyRole')
const {
    postUser,
    getAllUsers,
    logUser,
    signoutUser,
    putUser,
    deleteUser,
    getUser,
} = require('../controllers/userController')

router
    .post('/', postUser)
    .get('/', verifyAccessToken, verifyRole(['owner', 'admin']), getAllUsers)
    .delete('/', verifyAccessToken, deleteUser)
    .put('/', verifyAccessToken, putUser)
router.get('/current', verifyAccessToken, getUser)
router.post('/login', logUser)
router.post('/signout', signoutUser)

module.exports = router