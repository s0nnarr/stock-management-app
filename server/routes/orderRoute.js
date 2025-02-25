const { getAllOrders } = require('../controllers/orderController');

const express = require('express')
const router = express.Router();

router.get('/', getAllOrders);

module.exports = router;
