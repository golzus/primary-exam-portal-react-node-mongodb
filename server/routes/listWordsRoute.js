const express=require("express")
const router=express.Router()
const listWordsController=require('../controllers/listWordsController')



router.get("/",listWordsController.getListWords)
router.post("/get",listWordsController.getlistWordById)
 router.post("/",listWordsController.getListWordsByClass)
 router.post("/active",listWordsController.getListWordsByClassAndByActive)
// //router.get("/:id")
 router.post("/add",listWordsController.addListWords)
 router.put("/",listWordsController.updateListWords)
 router.delete("/",listWordsController.deleteListWords)
 router.post("/marks/byListWord",listWordsController.getTestsOfAllStudentsById)
module.exports=router