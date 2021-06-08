const Product = require('../models/product');

exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    .populate('category')
    .exec((err,pr)=>{
        if(err){
            return res.status(400).json({error: "Product not Found in DB"})
        }
        req.product = pr;
        next();
    });
};

exports.getProduct = (req, res) =>{
    return res.json(req.product);   
};