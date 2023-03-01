const Poll = require('../models/Poll')
const express = require('express')
const isNullorUndefinedorEmpty = require('../utility')
const Admin = require('../models/Admin')
const User = require('../models/User')
const AlreadyVoted = require('../models/AlreadyVoted')
const { default: mongoose } = require('mongoose')
const PollRoutes = express.Router()
const ObjectID = mongoose.Types.ObjectId


PollRoutes.post('/createpoll',async(req,res)=>{
    try{
        if(isNullorUndefinedorEmpty(req.body.polls) && isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.text)){
            const findadmin = await Admin.findOne({email:req.body.email}).lean()
            if(findadmin !== null){
                if(req.body.polls.length < 2){
                    res.json({
                        error:"enter atleast two candidates",
                        data:null
                    })                
                }else{
                    const findtext = await Poll.findOne({text:req.body.text}).lean()
                    if(findtext !== null){
                        res.json({
                            error:"enter another text",
                            data:null
                        })
                    }else{
                        let pollsobj = []
                        for(let i =0 ;i<req.body.polls.length;i++){
                            pollsobj.push({"candidateName":req.body.polls[i].candidateName,"candidateURL":req.body.polls[i].candidateURL,"vote":0})
                        }
                        // console.log(pollsobj)
                        const newpoll = new Poll({
                            text:req.body.text,
                            email:req.body.email,
                            polls:pollsobj
                        })
                        // console.log(newpoll);
                        // const savepoll = await newpoll.save()
                        // console.log(savepoll);
                        const savepoll = await newpoll.save()
                        res.json({
                            error:null,
                            data:savepoll
                        })
                    }
                }
            }else{
                res.json({
                    error:"only admin can creater poll",
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
            error:`something went wrong ${error}`,
            data:null
        })
    }
})

PollRoutes.post('/showpolls',async(req,res)=>{
    try{
        const findpoll = await Poll.find({})
        // console.log(findpoll)
        res.json({
            error:null,
            data:findpoll
        })        
    }catch(error){
        res.json({
            error:"something went wrong",
            data:null
        })
    }
})

PollRoutes.post("/vote",async(req,res)=>{
    try{
        if(isNullorUndefinedorEmpty(req.body.pollingid) && isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.candidateid)){
            const findpoll = await Poll.findOne({_id:(req.body.pollingid)}).lean()
            const finduser = await User.findOne({_id:(req.body.userid)}).lean()
            if(findpoll !== null && finduser !== null){
                const findalreadyvote = await AlreadyVoted.findOne({pollingid:req.body.pollingid,userid:req.body.userid}).lean()
                if(findalreadyvote !== null){
                    res.json({
                        error:"user has voted already",
                        data:null
                    })
                }else{
                    var poll = findpoll.polls
                    let flg = false
                    for(let i=0;i<poll.length;i++){
                        if(poll[i]._id == (req.body.candidateid)){
                            if(poll[i].vote == NaN) poll[i].vote = 1
                            else poll[i].vote += 1
                            flg = true
                        }
                    }
                    if(flg){
                        const updatepoll = await Poll.updateOne(
                            {_id:(req.body.pollingid)},
                            {
                                $set:{
                                    polls:poll
                                }
                            }
                        )
                        const getupdatepoll = await Poll.findOne({_id:(req.body.pollingid)}).lean()
                        const newalreadyvote = new AlreadyVoted({
                            pollingid:(req.body.pollingid),
                            userid:(req.body.userid)
                        })
                        const savevote = await newalreadyvote.save()
                        res.json({
                            error:null,
                            data:getupdatepoll
                        })
                    }else{
                        res.json({
                            error:"enter valid candidateid to vote",
                            data:null
                        })
                    }
                }
            }else{
                res.json({
                    error:"enter valid poll or user",
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
            error:`something went wrong ${error}`,
            data:null
        })
    }
})


module.exports = PollRoutes 