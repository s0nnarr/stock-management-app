const express = require('express');
const router = express.Router();

const {getAuditLog,postCompany,getCompanyAbout,getCompanyUsers}=require('../controllers/companyController.js');

router
    
    .get("/getauditlog",getAuditLog)
    .get("/getcompanyusers",getCompanyUsers)
    .post("/",postCompany)
    .get("/:id",getCompanyAbout)
    
    

module.exports = router;