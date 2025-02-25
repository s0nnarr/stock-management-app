const express = require('express');
const router = express.Router();

const {getAuditLog, getAllCompanies}=require('../controllers/companyController.js');

router 
    .get("/getauditlog",getAuditLog);

router.get('/', getAllCompanies)

module.exports = router;