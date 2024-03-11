const School=require("../models/School")
const Class=require('../models/Class')
const getSchools = async (req, res) => {

    const schools=await School.find({deleted:false})
    if(!schools.length){
        return res.status(400).json({error:true,message:"no schools",data:null})
    }
    res.json(({error:false,message:"",data:schools}))
};
const addSchool = async (req, res) => {
    const image=(req.file?.filename? req.file.filename:"")
    const{name,teacher,active}=req.body
    if(!name||!teacher){
        return res.status(400).json({error:true,message:"name  and teacher are required!",data:null})
    }
    try {
        const school=await School.create({name,teacher})
        if(!school){
            return res.status(400).json({error:true,message:"something wrong",data:null})
        }
        res.json(({error:false,message:"",data:school}))
    
    } catch (error) {
res.json(error)    }
  
};

const addClass = async (req, res) => {
    const{name,school,active}=req.body
    if(!name||!school){
        return res.status(400).json({error:true,message:"name  and school are required!",data:null})
    }
const class1=await Class.create({name,school,active})
 res.json({error:false,message:"",data:class1})

};

const getAllClass=async (req,res)=>{
    // const {school}=req.body
    // if (!school)return res.status(400).json({error:true,message:"name  and school are required!",data:null})

    const classes=await Class.find({deleted:false});
    if(!classes)  return   res.status(400).json({error:true,message:"name  and school are required!",data:null})
    res.json({error:false,message:"",data:classes})
}

// const updateSchool = async (req, res) => {
//     const{name,active,_id}=req.body
//     if(!name||!_id){
//         return res.status(400).json({error:true,message:"name and id are required!",data:null})
//     }
//     const school=await School.findById(_id)
//     if(!school){
//         return res.status(400).json({error:true,message:"no school found",data:null})
//     }
//     school.name=name
//     school.active=active
//     const updateSchool=await school.save()
//     res.json(({error:false,message:"",data:updateSchool}))
// };

const updateSchool = async (req, res) => {
    const{school}=req.body
    if(!school){
        return res.status(400).json({error:true,message:" school is required!",data:null})
    }
    const classes=await Class.find({school:school})
    if(!classes){
        return res.status(400).json({error:true,message:"no classes found",data:null})
    }
    // school.name=name
    // school.active=active
    // const updateSchool=await school.save()
    res.json(({error:false,message:"",data:classes}))
};
// const getAllClass=async (req,res)=>
// {const {school}=req.body
//     const classes=await
// }

const deleteSchool = async (req, res) => {
    const {_id}=req.body
    if(!_id){
        return res.status(400).json({error:true,message:"_id is required!",data:null})
    }
    const school=await School.findById(_id)
    if(!school){
        return res.status(400).json({error:true,message:"no school found",data:null})
    }
    school.deleted="true"
    const deletedSchool = await school.save();
        res.json(({error:false,message:"",data:deletedSchool}))

};

const deleteClass = async (req, res) => {
    const {_id}=req.body
    if(!_id){
        return res.status(400).json({error:true,message:"_id is required!",data:null})
    }
    const classFound=await Class.findById(_id)
    if(!classFound){
        return res.status(400).json({error:true,message:"no class found",data:null})
    }
    classFound.deleted="true"
    const deletedClass = await classFound.save();
        res.json(({error:false,message:"",data:deletedClass}))

};

module.exports={getSchools,getAllClass,addSchool,addClass,deleteSchool,updateSchool,deleteClass}