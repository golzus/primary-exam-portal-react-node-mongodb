const mongoose=require('mongoose')
const ActionStepSchema = require('./SubSchema/ActionStepSchema')

const actionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String
    },
    steps:{
        type:[ActionStepSchema]
    }
},{timestamps:true})