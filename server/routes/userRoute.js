const express=require("express")
const router=express.Router()


const userController=require('../controllers/userController')
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")

// router.use(verifyJWT)
// router.use(verifyAdmin)

router.get("/",userController.getUsers)
router.post("/class",userController.getUsersByClass)
router.post("/username",userController.checkIfUsernameExist)

router.post("/:id",userController.getUserById)
router.post("/",userController.addUser)
router.put("/",userController.updateUser)
router.delete("/",userController.deleteUser)
module.exports=router