const mongoose=require("mongoose")
const TestsArraySubSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
type:mongoose.Schema.Types.Date
    },
    active:{
type:Boolean,
default:false
    },
    test:{
        type:[]
    },
    mark:{
        type:BigInt
    }
    
},{timestamps:true})
module.exports=TestsArraySubSchema