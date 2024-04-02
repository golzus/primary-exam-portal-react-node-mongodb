const Test =require("../models/Test")

const getTestByClassAndUser = async (req, res) => {
    const {classId,listWord}=req.body
    try {  
    const test=await Test.find({class:classId,listWord})
    res.json(({error:false,message:"",data:test}))
} catch (error) {
  console.log(error,"error");      
}
};
module.exports={getTestByClassAndUser}