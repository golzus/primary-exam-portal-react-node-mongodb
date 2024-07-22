const Test =require("../models/Test")

const getTestByClassAndUser = async (req, res) => {
    const {user}=req.body
    try {  
    const test=await Test.find({user})
    res.json(({error:false,message:"",data:test}))
} catch (error) {
  console.log(error,"error");      
}
};

module.exports={getTestByClassAndUser}
