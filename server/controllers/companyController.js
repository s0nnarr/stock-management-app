const companyModel= require('../models/companyModel.js')

const getAuditLog=async(req,res)=>{

    try{

        const companyID=req.query.companyID;

        const page = req.query.page || 0;
        const size = req.query.size || 5;

        
        const auditLog= await companyModel.find({id:companyID}).skip(page*size).limit(size);

        if(!auditLog){
            throw new Error('No audit log found');
        }

        res.status(200).json({auditLog:auditLog});
    


    }
    catch(error){
        res.status(400).json({message:error.message});
    }

}

module.exports={getAuditLog}
