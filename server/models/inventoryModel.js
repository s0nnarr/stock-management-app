const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    company: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Company',
        type: String,
        required: true
    },
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
            required: false
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
        required:false
    }

}, {
    timestamps:true
});



const Inventory= mongoose.model('Inventory', inventorySchema);
module.exports=Inventory;
