const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type:String,
        unique:true,
        require:true,
        
    },name:{
        type:String,
        require:true
    },aadhar:{
        type:String,
        require:true,
        unique:true
    },age:{
        type:Number,
        require:true
    },password:{
        type:String,
        require:true
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)
module.exports  = User