const orderModel = require('../models/orderModel');
const inventoryModel = require('../models/inventoryModel');
const companyModel = require('../models/companyModel');
const userModel = require('../models/userModel');

const getAllOrders = async (req, res) => {
    /* Controller for development-testing purposes. */
    
    try {
        let orders = await orderModel.find();
        if (!orders.length) {
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

const createOrder = async (req, res) => { 
    /* Create or update the order */

    const { company, sales, customer, total, status } = req.body;
    
    const _company = await companyModel.findById(company);
    if (!_company) {
        return res.status(404).json({ message: "Company with that ID not found. "});
    };

    const _user = await userModel.findById(customer);
    if (!_user) {
        return res.status(404).json({ message: "User with that ID not found. "});
    }

    try {
        const _order = await orderModel.findOne({
            company,
            customer,
            'sales.inventory': { $in: sales.map(sale => sale.inventory)}
        });
        if (_order) {
            if (_order.status !== status) {
                _order.status = status;
                await _order.save();
                return res.status(200).json({
                        message: "Order status updated",
                        order: _order
                    })
            } else {
                return res.status(400).json({
                        message: "Order already exists with the same status."
                    })
            };
        };
        const newOrder = orderModel.create({
            company,
            sales,
            customer,
            total,
            status
        });
        
        return res.status(200).json({
            message: "Order created successfully!",
            order: newOrder
        })

    } catch (err) {
        return res.status(500).json({ message: "Error creating order." });
    }

}

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

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ 
            message: "Order ID is required."
        })
    };

    try {
        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order ID not found."
            });
        };

        await orderModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: "Order successfully deleted."
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error deleting order.",
            details: err.message
        })
        
    }

}

module.exports = { getAllOrders, getOrdersByCompany, createOrder, deleteOrder };
