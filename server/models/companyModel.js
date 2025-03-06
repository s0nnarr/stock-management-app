const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const companySchema = new Schema({
    id:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        
    },
    
    users: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['owner', 'admin', 'staff'],
            required: true
        }
    }],
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    currency:
    {
        type: String,
        required: true
    },
   

}, {
    timestamps:true
});



const Company= mongoose.model('Company', companySchema);
module.exports=Company;
