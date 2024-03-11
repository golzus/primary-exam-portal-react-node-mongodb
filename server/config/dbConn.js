const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(ex)
    {console.log("connect to db fail "+ex.message);}
}
module.exports=connectDB