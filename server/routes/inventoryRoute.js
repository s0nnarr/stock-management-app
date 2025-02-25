const express = require('express')
const router = express.Router()
const {
    postProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/inventoryController")

router
    .post('/', postProduct)
    .get('/', getAllProducts)
    .get('/:id', getOneProduct)
    .put('/:id', updateProduct)
    .delete('/:id', deleteProduct)
    
module.exports = router 