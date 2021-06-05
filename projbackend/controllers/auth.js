var User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signout = (req,res)=>{
    //clear cookie
    res.clearCookie("token");
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

exports.signin = (req,res)=>{

    const {email, password} = req.body;

    //check the error passed on from validation checks in router
    var errs = validationResult(req);
    if(!errs.isEmpty()){
        res.status(422).json({
            error: errs.array()[0].msg,
            parameter: errs.array()[0].param
        });
    }
    
    
    User.findOne({email},(err, user)=>{
        //if email is not found ie. err true
        if(err || !user) 
        {   return res.status(400).json({error: "User mail does not exist"});  }

        //if password associated not matches
        if(!user.authenticate(password)){
            return res.status(401).json({error: "Password does not match"});
        }

        //if Successfull then create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET); 

        //put token in cookie
        res.cookie("token",token,{expire: new Date()+9999});

        //send response to frontend
        const {_id, name, email, role} = user;
        res.json({token,user:{_id,name,email,role}});
    });

}

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET ,
    algorithms: ['HS256'],
    userProperty: "auth"
});

// exports.isAuthenticated = ;


//custom middlewares