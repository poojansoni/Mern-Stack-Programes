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

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    //from ui properties of user does the profile exists? is the user signed in? and Authenticate -> can chng only his properties so, auth id and profile id should match
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};
exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"You are not ADMIN, access denied"
        });
    }
    next();
};