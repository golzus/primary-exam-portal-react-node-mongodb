const mongoose=require("mongoose")
const Company=require('../models/Company')
const Class=require("./Class")
const listWordsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
type:mongoose.Schema.Types.Date
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
    ref:Class  
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
    },
seeWords:{
    type:Boolean,
    default:true
},
countListenToWord:{
    type:Number,
    default:5
}
},{timestamps:true})

module.exports=mongoose.model("ListWords",listWordsSchema)