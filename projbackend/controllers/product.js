const Product = require('../models/product');
const formidable = require('formidable'); //to collect data like form.. pdfs/imgs etc
const _ = require('lodash'); //helps with arrays functions
const fs = require('fs');

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
    req.product.photo = undefined;
    return res.json(req.product);   
};

//middleware
exports.photo = (req,res,next)=>{
    //if data present then onky ret
    if(req.product.photo.data) 
    {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields, file) => {
        if(err){
            return res.status(400).json({error: "Problem with image"});
        }

        //destructuring fields
        const {name,description,price,category,stock} = fields;
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock 
        ){
            return res.status(400).json({error: "Please fill all the fields"});
        }
        
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000) //3mb
            {
                return res.status(400).json({error: "File size too big!"});
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save in db
        product.save((err, pr) => {
            if(err){
                return res.status(400).json({error: "Saving tshirt in Db failed"});
            }
            res.json(pr);
        });
    });
};