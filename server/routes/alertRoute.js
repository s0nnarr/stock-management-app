const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../middleware/verifyAccessToken')
const { getAllAlerts } = require('../controllers/alertController')

router
    .get('/', verifyAccessToken, getAllAlerts)

module.exports = router