const mongoose = require('mongoose');
//const User = require('./user');
const {ObjectId} = mongoose.Schema;

const ProductItemSchema = new mongoose.Schema(
    {
        product:{
            type: ObjectId,
            ref: "Product"
        },
        name: String,
        count: Number,
        price: Number
    }
);
const ProductItem = mongoose.model("ProductItem",ProductItemSchema);


const orderSchema = new mongoose.Schema(
    {
        products: [ProductItemSchema],
        transaction_id: {},
        amount: {type: Number},
        address: String,
        status:{
            type: String,
            default: "Recieved",
            enum: ["Cancelled", "Delivered", "Shipped", "Processing","Recieved"]
        },
        updated: Date,
        user: {
            type: ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);
const Order = mongoose.model("Order",orderSchema);

module.exports = {Order,ProductItem};