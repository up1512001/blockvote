const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.Types.ObjectId

const AlreadyVotedSchema = new Schema({
    pollingid:{
        type:ObjectID,
        require:true,
    },userid:{
        type:ObjectID,
        require:true
    }
},{timestamps:true})

const AlreadyVoted = mongoose.model("AlreadyVoted",AlreadyVotedSchema)
module.exports = AlreadyVoted