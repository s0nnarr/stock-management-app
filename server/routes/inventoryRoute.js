const express = require('express')
const router = express.Router()

const verifyAccessToken = require('../middleware/verifyAccessToken')
const verifyRole = require('../middleware/verifyRole')

const {
    postProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/inventoryController")

router
    .post('/',verifyAccessToken, verifyRole(['admin', 'owner']), postProduct)
    .get('/',verifyAccessToken, getAllProducts)
    .get('/:id',verifyAccessToken, getOneProduct)
    .put('/:id',verifyAccessToken, verifyRole(['admin', 'owner']), updateProduct)
    .delete('/:id',verifyAccessToken, verifyRole(['admin', 'owner']), deleteProduct)
    
module.exports = router 