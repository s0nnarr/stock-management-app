const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
<<<<<<< HEAD
        type: String,
=======
>>>>>>> 11fc8bf2b1fef39585e11eea96b3a65fe1fb84ab
        required: true
    },
    productName: {
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
<<<<<<< HEAD
    auditLog:[{
        message:{
            type:String,
            required: false
        },
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

=======
>>>>>>> 11fc8bf2b1fef39585e11eea96b3a65fe1fb84ab
}, {
    timestamps:true
});



const Inventory= mongoose.model('Inventory', inventorySchema);
module.exports=Inventory;
