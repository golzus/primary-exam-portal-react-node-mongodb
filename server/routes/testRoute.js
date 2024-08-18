const express=require("express")
const router=express.Router()
const testController=require("../controllers/testController")
router.post("/",testController.getTestByClassAndUser)
router.post("/all",testController.getAllTests)
router.post("/single",testController.getTestById)
router.put("/",testController.updateTestAfterDoing)
router.post("/done",testController.getAllTestsDone)
module.exports=router