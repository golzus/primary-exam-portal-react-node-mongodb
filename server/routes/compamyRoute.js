const express=require("express")

const multer=require("multer")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,uniqueSuffix +"-"+file.originalname)
    }
})
const upload=multer({storage:storage})



const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")

const companyController=require('../controllers/companyController')
router.use(verifyJWT)
router.use(verifyAdmin)
router.get("/",companyController.getCompanies)
// router.get("/:id",companyController.getCompany)
router.post("/",upload.single('image'),companyController.addCompany)
// router.post("/",companyController.addCompany)

router.put("/",companyController.updateCompany)
router.delete("/",companyController.deleteCompany)

module.exports=router