const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    Company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
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
}, {
    timestamps:true
});



const Inventory= mongoose.model('Inventory', inventorySchema);
module.exports=Inventory;
