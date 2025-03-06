const express = require('express');
const router = express.Router();
const verifyAccessToken = require('../middleware/verifyAccessToken')
const verifyRole = require('../middleware/verifyRole')

const {

    postCompany,
    getCompanyAbout,
    getCompanyUsers,
    addUser,
    removeUser,
    deleteCompany
    }=require('../controllers/companyController.js');

router.get("/getcompanyusers",verifyAccessToken,getCompanyUsers);

router
    .post("/",verifyAccessToken,postCompany)
    .get("/:id",verifyAccessToken,getCompanyAbout)
    .delete("/:id",verifyAccessToken, verifyRole(['owner', 'admin']),deleteCompany)
   
router.put("/adduser",verifyAccessToken, verifyRole(['owner', 'admin']),addUser);
router.put("/removeuser",verifyAccessToken, verifyRole(['owner', 'admin']),removeUser);
    
    
    

module.exports = router;