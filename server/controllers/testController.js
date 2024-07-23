const Test =require("../models/Test")

const getTestByClassAndUser = async (req, res) => {
    const {user}=req.body
    try {  
    const test=await Test.find({user:user,active:true})
    res.json(({error:false,message:"",data:test}))
} catch (error) {
  console.log(error,"error");      
}
};
const getAllTestsDone = async (req, res) => {
  const {user}=req.body
  try {  
  const test=await Test.find({user:user,active:false})
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
    const {  test, active, _id } = req.body;

    if ( !_id) {
      console.log( "list");

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
   updateTest.active = active;
  if(test)
    updateTest.test = test;

    const updateTests = await updateTest.save();
    res.json({ error: false, message: "", data: updateTests });
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports={getTestByClassAndUser,getTestById,updateTestAfterDoing,getAllTestsDone}
