const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var Schema  = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    lastName:{
        type: String,
        maxlength: 32,
        trim: true
    },

    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    userInfo:{
        type: String,
        trim: true
    },

    encry_password:{
        type: String,
        required: true
    },

    salt: String,

    role:{
        type: Number,
        default: 0
    },

    purchases:{
        type: Array,
        default: []
    }
});

//dont use arrow functions, not supported much by schema
userSchema.virtual("password")
    .set(function(password){
        this._password = password; //store original pass in private obj
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    }) 
    .get(function(){
        return this._password;
    });

userSchema.method = {
    authenticate:function(plainPass){
        return this.securePassword(plainPass) === this.encry_password
    },

    securePassword = function(plainPass){
        if(!plainPass) return ""; //returning empty strng will throw err with db cause field is required!
        try{
            return crypto.createHmac('sha256',this.salt).update(plainPass).digest('hex'); //storing hashed value direct in db
        }catch(error){
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema); //maps the sshema to like.. make a class User thru which new user instances can be created