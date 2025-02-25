const inventoryModel = require('../models/inventoryModel.js')

const postProduct = async (req, res) => {
    const { company, product_name, price, unit, stock } = req.body
    try {
        const Product = await inventoryModel.create
            ({
                company, product_name, price, unit, stock
            })
        res.status(200).json(Product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const Products = await inventoryModel.find()
        res.status(200).json(Products)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOneProduct = async (req, res) => {
    try {
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
        // const User = await currentUser(req, res)
        // if (!User) {
        //     return res.status(403).json({ error: "InvalidId" });
        // }
        // //Check user authorization
        // if (User.role !== 'admin') {
        //     return res.status(403).json({ error: "Forbidden" });
        // }

        await inventoryModel.findByIdAndUpdate(id, req.body)
        res.status(200).json("Product updated successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteProduct = async (req, res) => {
    //in production -> only admins
    try {
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


module.exports = { postProduct, getOneProduct, getAllProducts, updateProduct, deleteProduct}
