var User = require("../models/user");

exports.signout = (req,res)=>{
    res.json({message:"Successfully signed out!"});
}
exports.signup = (req,res)=>{
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