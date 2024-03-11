//const User=require ('./User')
const mongoose=require("mongoose")
const seminarySchema=new mongoose.Schema({
    name:{
        type:String
    },
    active:{
type:Boolean,
default:true
    },
    image:{
        type:String
    },
    teacher:{
       type:mongoose.Schema.Types.ObjectId,
ref:'User'
    },
    deleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("School",seminarySchema)