const {Order,ProductItem} = require('../models/order');

exports.getOrderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate('products.product','name price')
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({error: "Order not Found in DB"})
        }
        req.order = order;
        next();
    });
};