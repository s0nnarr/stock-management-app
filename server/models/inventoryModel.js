const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    stock:
    {
        type: Number,
        required: true
    },
    auditLog:[{
        message:{
            type:String,
            required:true   
        }
        ,
        date:{
            type:Date,
            default:Date.now
        },
        time:{
            type:String,
            default:new Date().toLocaleTimeString()
        }
    }],
    alertLog:{
        type:String,
        required:true
    }

}, {
    timestamps:true
});



const Inventory= mongoose.model('Inventory', inventorySchema);
module.exports=Inventory;
