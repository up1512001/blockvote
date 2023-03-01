const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollSchema = new Schema({
    text:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    polls:[
        {
            candidateName:{
                type:String,
                unique:false
            },candidateURL:{
                type:String,
                unique:false
            },vote:{
                type:Number,
                default:0
            }
        }
    ]
},{timestamps:true})

PollSchema.index({"text":1},{"unique":1});
PollSchema.index({"polls":2},{"unique":0})
const Poll = mongoose.model("Poll",PollSchema)
module.exports = Poll