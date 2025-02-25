const orderModel = require('../models/orderModel');
const inventoryModel = require('../models/inventoryModel');
const companyModel = require('../models/companyModel');
const userModel = require('../models/userModel');

const createOrder = async (req, res) => {
    const { company, sales, customer, total, status, date} = req.body;

    const _company = await companyModel.findById(company);
    const _customer = await userModel.findById(customer);
    if (!_company || !_customer) {
        return res.status(404).json({ message: "Company or customer nonexistent."});
    };

    for (let item of sales) {
        const _inventory = await inventoryModel.findById(item.inventory)
        if (!_inventory) {
            return res.status(404).json({ message: "Inventory not found. "});
        };
    };
    
    try {
        const newOrder = await orderModel.create({
            company,
            sales,
            customer,
            total,
            status,
            date
        });

        await newOrder.save();
        res.status(200).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: "Error creating order", details: err.message })
    }
}

const getAllOrders = async (req, res) => {

    try {
        const Orders = await orderModel.find();
        res.status(200).json(Orders);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", details: { err } })
    } 
};

// const findOrdersByCompanyId = async (req, res) => {
//     /* finds order by company obj */
//     const { company } = req.body;

//     const _company = await companyModel.findById(company);
//     if (!_company) {
//         return res.status(404).json({ message: "Company not found. "});
//     }

//     try {

//     }
// }

module.exports = { getAllOrders, createOrder };