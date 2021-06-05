const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err,caty)=>{
        if(err){
            return res.status(400).json({error: "Category not Found in DB"})
        }
        req.category = caty;
        next();
    });
};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err, cat) => {
        if(err){
            return res.status(400).json({error: "Not able to save the Category in DB"});
        }
        res.json(cat);
    })
};