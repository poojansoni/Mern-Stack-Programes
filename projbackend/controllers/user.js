const User = require("../models/user");

exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}



exports.getAllUsers = (req,res) => {
    
    User.collection.find().toArray(function(err, result) {
        if (err) return res.status(400).json({error: err});
        return res.json(result);
    });
    
}