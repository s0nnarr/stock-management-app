const express = require('express');
const router = express.Router();

const {getAuditLog,postCompany,getCompanyAbout,getCompanyUsers,addUser}=require('../controllers/companyController.js');

router
    
    .get("/getauditlog",getAuditLog)
    .get("/getcompanyusers",getCompanyUsers)
    
    .get("/:id",getCompanyAbout)
    .post("/",postCompany)
    .post("/adduser",addUser)
    
    

module.exports = router;