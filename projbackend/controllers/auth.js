var User = require("../models/user");
const { validationResult } = require('express-validator');

exports.signout = (req,res)=>{
    res.json({message:"Successfully signed out!"});
}
exports.signup = (req,res)=>{
    //check the error passed on from validation checks in router
    var errs = validationResult(req);
    if(!errs.isEmpty()){
        return res.status(422).json({
            error: errs.array()[0].msg,
            parameter: errs.array()[0].param
        });
    }
    //creating new user
    const user = new User(req.body);

    //saving user in DB, with a call back to response which returns 2 fields error, object
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
    
}