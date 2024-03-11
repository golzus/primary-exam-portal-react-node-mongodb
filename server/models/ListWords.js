const mongoose=require("mongoose")
const Company=require('../models/Company')
const listWordsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
type:mongoose.Schema.Types.Date
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Company
    },
    active:{
type:Boolean,
default:false
    },
    test:{
        type:[]
    }
},{timestamps:true})

module.exports=mongoose.model("ListWords",listWordsSchema)