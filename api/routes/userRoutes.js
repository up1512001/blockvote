const User = require('../models/User')
const express = require('express')
const isNullorUndefinedorEmpty = require('../utility')
const UserRoutes = express.Router()



UserRoutes.post('/createuser',async(req,res)=>{
    try{
        if(isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.name) && isNullorUndefinedorEmpty(req.body.aadhar) && isNullorUndefinedorEmpty(req.body.age) && isNullorUndefinedorEmpty(req.body.password)){
            const finduser = await User.findOne({email:req.body.email}).lean()
            const findaadhar = await User.findOne({aadhar:req.body.aadhar}).lean()
            // console.log("hello")
            if(finduser !== null || findaadhar !== null){
                res.json({
                    error:"user already registered",
                    data:null
                })
            }else if(Number(req.body.age) < 18){
                res.json({
                    error:"user is minor",
                    data:null
                })
            }else{
                // console.log("hello")
                const newuser = new User({
                    email:req.body.email,
                    name:req.body.name,
                    aadhar:req.body.aadhar,
                    age:Number(req.body.age),
                    password:req.body.password
                })
                const saveuser = await newuser.save()
                res.json({
                    error:null,
                    data:saveuser
                })
            }
        }else{
            res.json({
                error:"enter required fields",
                data:null
            })
        }
    }catch(error){
        res.json({
            error:"something went wrong",
            data:null
        })
    }
})

UserRoutes.post('/getuser',async(req,res)=>{
    try{
        if(isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.password)){
            const finduser = await User.findOne({email:req.body.email}).lean()
            if(finduser !== null && finduser.password == req.body.password){
                res.json({
                    error:null,
                    data:finduser
                })
            }else{
                res.json({
                    error:"enter valid fields",
                    data:null
                })
            }
        }else{
            res.json({
                error:"enter required fields",
                data:null
            })
        }
    }catch(error){
        res.json({
            error:"something went wrong",
            data:null
        })
    }
})

module.exports = UserRoutes