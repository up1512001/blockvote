const Admin = require('../models/Admin')
const isNullorUndefinedorEmpty = require('../utility')
const express = require('express')
const AdminRoute = express.Router()

AdminRoute.post('/createadmin', async(req, res)=> {
    try {
        if (isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.name) && isNullorUndefinedorEmpty(req.body.password)) {
            const finduser = await Admin.findOne({ email: req.body.email }).lean()
            if (finduser !== null) {
                res.json({
                    error: "Already Registered Email",
                    data: null
                })
            } else {
                const newadmin = new Admin({
                    email: req.body.email,
                    name: req.body.name,
                    password:req.body.password
                })
                const saveadmin = await newadmin.save()
                res.json({
                    error: null,
                    data: saveadmin
                })
            }
        } else {
            res.json({
                error: "enter email and name",
                data: null
            })
        }
    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null
        })
    }
})

AdminRoute.post('/getadmin',async(req,res)=>{
    try{
        if(isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.password)){
            const findadmin = await Admin.findOne({email:req.body.email}).lean()
            if(findadmin !== null && findadmin.password == req.body.password){
                res.json({
                    error:null,
                    data:findadmin
                })
            }else{
                res.json({
                    error:"enter valid values",
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

module.exports = AdminRoute


