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

exports.getCategory = (req, res) =>{
    return res.json(req.category);   
};

exports.getAllCategories = (req,res)=>{
    Category.find().exec((err, categories) =>{
        if(err) return res.status(400).json({error: "No Categories Found"});
        return res.json(categories);
    });
};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err, cat) => {
        if(err){
            return res.status(400).json({error: "Not able to save the Category in DB"});
        }
        res.json(cat);
    });
};

exports.updateCategory = (req, res) =>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err, Updatedcat) => {
        if(err){
            return res.status(400).json({error: "Not able to Update the Category in DB"});
        }
        res.json(Updatedcat);
    });
};

exports.removeCategory = (req,res) => {
    const category = req.category;
    category.remove((err, catergory) => {
        if(err){
            return res.status(400).json({error: "Failed to delete Category in DB"});
        }
        res.json({message: `Successfully deleted category: ${category}`});
    });
};