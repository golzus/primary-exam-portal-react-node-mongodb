const mongoose=require("mongoose")
const Company=require("./Company")
const Class=require('./Class')

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
          unique:true,
    },
    // phone:{
    //     type:String
    // },
    roles:{
        type:String,
        enum:["Student","Teacher","User","Principal"],
        default:"Student"
    },
//     company:{
// type:mongoose.Schema.Types.ObjectId,
// ref:Company
//     },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Class
            },
    email:{
        type:String,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
deleted:{
    type:Boolean,
    default:false
},
},{timestamps:true})
module.exports=mongoose.model("User",userSchema)
