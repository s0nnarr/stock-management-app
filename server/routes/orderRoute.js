const express = require('express');
const router = express.Router();

const { createOrder, getAllOrders, deleteOrder, getOrdersByCompany } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);
router.get('/getordersbycompany', getOrdersByCompany);

module.exports = router;
