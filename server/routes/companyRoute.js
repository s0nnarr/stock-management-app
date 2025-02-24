const express = require('express');
const router = express.Router();

const {getAuditLog}=require('../controllers/companyController.js');

router 
    .get("/getauditlog",getAuditLog);

module.exports = router;