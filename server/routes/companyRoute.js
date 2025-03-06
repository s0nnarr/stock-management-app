const express = require('express');
const router = express.Router();
const verifyAccessToken = require('../middleware/verifyAccessToken')
const verifyRole = require('../middleware/verifyRole')

<<<<<<< HEAD
const {getAuditLog,postCompany,getCompanyAbout,getCompanyUsers,getAllCompanies}=require('../controllers/companyController.js');

router
    
    .get("/getauditlog",getAuditLog)
    .get("/getcompanyusers",getCompanyUsers)
    .post("/",postCompany)
    .get('/', getAllCompanies)
    .get("/:id",getCompanyAbout)


=======
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
    
    
>>>>>>> 11fc8bf2b1fef39585e11eea96b3a65fe1fb84ab
    

module.exports = router;