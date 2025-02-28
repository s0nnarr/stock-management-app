const orderModel = require('../models/orderModel');
const inventoryModel = require('../models/inventoryModel');
const companyModel = require('../models/companyModel');
const userModel = require('../models/userModel');

const getAllOrders = async (req, res) => {
    /* Controller for development-testing purposes. */
    
    try {
        let orders = await orderModel.find();
        if (!orders) {
            res.status(404).json({message: "No orders found. "});
        };

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching orders",
            details: err.message
        })
    }
};

const getOrdersByCompany = async (req, res) => {
    const { company } = req.body;

    if (!company) {
        res.status(400).json({ message: "Company ID required in req.body. "})       
    };

    try {
        const orders = await orderModel.find({ company }).populate('sales.inventory customer');
        return res.status(200).json(orders);
        
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching the company's orders.",
            details: err.message
        })
    };
};



module.exports = { getAllOrders, getOrdersByCompany };



