const mongoose = require("mongoose");
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

    //TODO: come back here
    password:{
        type: String,
        trim: true
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

module.exports = mongoose.model("User", userSchema); //maps the sshema to like.. make a class User thru which new user instances can be created