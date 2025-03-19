const inventoryModel = require('../models/inventoryModel.js')
const alertModel = require('../models/alertModel.js')

const postProduct = async (req, res) => {
    const { company, productName, price, unit, stock } = req.body
    if (!company || !productName || !price || !unit || !stock) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        //Check current user
        const User = req.user;
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        //Check user authorization
        if (User.role !== 'admin' && User.role !== 'owner') {
            return res.status(403).json({ error: "Forbidden" });
        }

        const Product = await inventoryModel.create
            ({
                company, productName, price, unit, stock
            })
        res.status(200).json(Product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        //Check current user
        const User = req.user;
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }

        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 5;

        const Products = await inventoryModel
            .find()
            .populate('Company', 'name')
            .skip(page * size)
            .limit(size)
            .select({
                company: 1,
                productName: 1,
                price: 1,
                unit: 1,
                stock: 1,
                _id: 0,
            })
        res.status(200).json(Products)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOneProduct = async (req, res) => {
    try {
        //Check current user
        const User = req.user;
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }

        const { id } = req.params;
        const Product = await inventoryModel.findById(id);
        if (!Product) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json(Product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    try {
        //Check current user
        const User = req.user;
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        //Check user authorization
        if (User.role !== 'admin' && User.role !== 'owner') {
            return res.status(403).json({ error: "Forbidden" });
        }

        const inventory = await inventoryModel.findByIdAndUpdate(id, req.body)
        const { company, productName, stock, unit } = await inventoryModel.findById(inventory._id)

        //Stock alerts
        if (stock === 0) {
            await alertModel.create({ company, message: `Product '${productName}' is out of stock!` })
        }
        else if (stock <= 20) {
            await alertModel.create({ company, message: `Product '${productName}' has ${stock} ${unit} left on stock!` })
        }

        res.status(200).json("Product updated successfully");
    } catch (err) {

        res.status(400).json({ error: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        //Check current user
        const User = req.user;
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        //Check user authorization
        if (User.role !== 'admin' && User.role !== 'owner') {
            return res.status(403).json({ error: "Forbidden" });
        }
        
        const { id } = req.params;
        const Product = await inventoryModel.findByIdAndDelete(id);
        if (!Product) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json("Inventory deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


module.exports = { postProduct, getOneProduct, getAllProducts, updateProduct, deleteProduct }
