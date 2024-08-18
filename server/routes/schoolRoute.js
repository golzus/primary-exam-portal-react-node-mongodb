const express=require("express")

// const multer=require("multer")
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public/uploads')
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
//         cb(null,uniqueSuffix +"-"+file.originalname)
//     }
// })
// const upload=multer({storage:storage})



const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")

const schoolController=require('../controllers/schoolController')
// router.use(verifyJWT)
// router.use(verifyAdmin)
router.post("/list",schoolController.getSchools)
router.post("/list/class",schoolController.getAllClassesBySchool)
//  router.get("/:id",companyController.getCompany)
// router.post("/",upload.single('image'),companyController.addCompany)
 router.post("/",schoolController.addSchool)
 router.post("/class",schoolController.addClass)
 router.put("/",schoolController.updateSchool)
router.delete("/",schoolController.deleteSchool)
router.delete("/class",schoolController.deleteClass)

module.exports=router