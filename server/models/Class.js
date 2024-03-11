const School=require('./School')
const mongoose=require("mongoose")
const classSchema=new mongoose.Schema({
    name:{
        type:String
    },
    active:{
type:Boolean,
default:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
ref:School
    },
},{timestamps:true})

module.exports=mongoose.model("Class",classSchema)