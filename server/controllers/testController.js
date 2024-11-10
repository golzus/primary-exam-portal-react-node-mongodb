

const Test =require("../models/Test");
const User = require("../models/User");

const getTestByClassAndUser = async (req, res) => {
    const {user}=req.body
    try {  
    const test=await Test.find({user:user,complete:false})
    res.json(({error:false,message:"",data:test}))
} catch (error) {
  console.log(error,"error");      
}
}; 
const getAllTestsDone = async (req, res) => {
  const {user}=req.body
  try {  
  const test=await Test.find({user:user,complete:true})
  res.json(({error:false,message:"",data:test}))
} catch (error) {
console.log(error,"error");      
}
};
const getAllTests = async (req, res) => {
  
  const {user}=req.body
  try {  
  const test=await Test.find({user:user}).populate("user").lean()
  res.json(({error:false,message:"",data:test}))
} catch (error) {
console.log(error,"error");      
}
};
const getTestById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ error: true, message: "_id is required", data: null });
    const test = await Test.findById(_id).lean();
    res.json({ error: false, message: "", data: test });
  } catch (error) {
    console.log(error, "error");
  }
};

const updateTestAfterDoing = async (req, res) => {
  try {
    const { mark, test, active, _id ,complete} = req.body;

    if ( !_id) {
      return res.status(400).json({
        error: true,
        message: "test and_id  are required!",
        data: null,
      });
    }
    const updateTest = await Test.findById(_id);
    if (!updateTest) {
      return res
        .status(400)
        .json({ error: true, message: "no test found", data: null });
    }
   updateTest.complete=complete
   updateTest.active=active
   if(!test){
    const updateTests = await updateTest.save();
   return res.json({ error: false, message: "", data: updateTests });
   }
 
  if(test){
    updateTest.test = test;
    updateTest.complete=complete
    updateTest.mark=mark
  }
    const updateTests = await updateTest.save();
    res.json({ error: false, message: "", data: updateTests });
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports={getTestByClassAndUser,getTestById,updateTestAfterDoing,getAllTestsDone,getAllTests}
