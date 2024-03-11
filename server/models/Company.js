const mongoose=require("mongoose")
const companySchema=new mongoose.Schema({
    name:{
        type:String
    },
    type:{
        type:String,
        enum:['OP','OM'],
    },
    active:{
type:Boolean,
default:true
    },
    image:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("Company",companySchema)