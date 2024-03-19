const express=require("express")
const router=express.Router()
const listWordsController=require('../controllers/listWordsController')




 router.post("/",listWordsController.getListWords)
// //router.get("/:id")
 router.post("/add",listWordsController.addListWords)
 router.put("/",listWordsController.updateListWords)
 router.delete("/",listWordsController.deleteListWords)
module.exports=router