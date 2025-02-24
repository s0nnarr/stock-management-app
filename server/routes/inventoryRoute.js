const express = require('express')
const router = express.Router()
const {
    postProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/inventoryController")

router
    .post('/', postProduct)
    .put('/:id', updateProduct)
    .delete('/:id', deleteProduct)
    
module.exports = router 