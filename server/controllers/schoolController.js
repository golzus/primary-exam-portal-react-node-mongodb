const School = require("../models/School");
const Class = require("../models/Class");

const getSchools = async (req, res) => {
    try {
        const { teacher } = req.body;
        const schools = await School.find({ deleted: false, teacher });
        if (!schools.length) {
            return res.status(200).json({ error: false, message: "no schools", data: null });
        }
        res.json({ error: false, message: "", data: schools });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

const addSchool = async (req, res) => {
    try {
        const image = req.file?.filename ? req.file.filename : "";
        const { name, teacher, active } = req.body;
        if (!name || !teacher) {
            return res.status(400).json({ error: true, message: "name and teacher are required!", data: null });
        }
        const school = await School.create({ name, teacher });
        if (!school) {
            return res.status(200).json({ error: true, message: "no schools for this teacher", data: null });
        }
        res.json({ error: false, message: "", data: school });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

const addClass = async (req, res) => {
    try {
        const { name, school, active } = req.body;
        if (!name || !school) {
            return res.status(400).json({ error: true, message: "name and school are required!", data: null });
        }
        const class1 = await Class.create({ name, school, active });
        res.json({ error: false, message: "", data: class1 });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

const getAllClassesBySchool = async (req, res) => {
    try {
        const { school } = req.body;
        if (!school) {
            return res.status(400).json({ error: true, message: "school is required!", data: null });
        }
        const classes = await Class.find({ deleted: false, school });
        if (!classes) {
            return res.status(200).json({ error: true, message: "no classes at this school!", data: null });
        }
        res.json({ error: false, message: "", data: classes });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

const updateSchool = async (req, res) => {
    try {
        const { school } = req.body;
        if (!school) {
            return res.status(400).json({ error: true, message: "school is required!", data: null });
        }
        const classes = await Class.find({ school });
        if (!classes) {
            return res.status(400).json({ error: true, message: "no classes found", data: null });
        }
        res.json({ error: false, message: "", data: classes });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

const deleteSchool = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ error: true, message: "_id is required!", data: null });
        }
        const school = await School.findById(_id);
        if (!school) {
            return res.status(400).json({ error: true, message: "no school found", data: null });
        }
        school.deleted = true;
        const deletedSchool = await school.save();
        res.json({ error: false, message: "", data: deletedSchool });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

const deleteClass = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ error: true, message: "_id is required!", data: null });
        }
        const classFound = await Class.findById(_id);
        if (!classFound) {
            return res.status(400).json({ error: true, message: "no class found", data: null });
        }
        classFound.deleted = true;
        const deletedClass = await classFound.save();
        res.json({ error: false, message: "", data: deletedClass });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error", data: null });
    }
};

module.exports = { getSchools, getAllClassesBySchool, addSchool, addClass, deleteSchool, updateSchool, deleteClass };


// const School=require("../models/School")
// const Class=require('../models/Class')
// const getSchools = async (req, res) => {
 
// const {teacher}=req.body
//     const schools=await School.find({deleted:false,teacher})
//     if(!schools.length){
//         return res.status(200).json({error:false,message:"no schools",data:null})
//     }
//     res.json(({error:false,message:"",data:schools}))
// };
// const addSchool = async (req, res) => {
//     const image=(req.file?.filename? req.file.filename:"")
//     const{name,teacher,active}=req.body
//     if(!name||!teacher){
//         return res.status(400).json({error:true,message:"name  and teacher are required!",data:null})
//     }
//     try {
//         const school=await School.create({name,teacher})
//         if(!school){
//             return res.status(200).json({error:true,message:"no schools for this teacher",data:null})
//         }
//         res.json(({error:false,message:"",data:school}))
    
//     } catch (error) {
// res.json(error)    }
  
// };

// const addClass = async (req, res) => {
//     console.log("hello");
//     const{name,school,active}=req.body
//     if(!name||!school){
//         return res.status(400).json({error:true,message:"name  and school are required!",data:null})
//     }
// const class1=await Class.create({name,school,active})
//  res.json({error:false,message:"",data:class1})

// };

// const getAllClassesBySchool=async (req,res)=>{
//      const {school}=req.body
//      if (!school)return res.status(400).json({error:true,message:"school is required!",data:null})

//     const classes=await Class.find({deleted:false,school});
//     if(!classes)  return   res.status(200).json({error:true,message:"no classes at this school!",data:null})
//     res.json({error:false,message:"",data:classes})
// }

// // const updateSchool = async (req, res) => {
// //     const{name,active,_id}=req.body
// //     if(!name||!_id){
// //         return res.status(400).json({error:true,message:"name and id are required!",data:null})
// //     }
// //     const school=await School.findById(_id)
// //     if(!school){
// //         return res.status(400).json({error:true,message:"no school found",data:null})
// //     }
// //     school.name=name
// //     school.active=active
// //     const updateSchool=await school.save()
// //     res.json(({error:false,message:"",data:updateSchool}))
// // };

// const updateSchool = async (req, res) => {
//     const{school}=req.body
//     if(!school){
//         return res.status(400).json({error:true,message:" school is required!",data:null})
//     }
//     const classes=await Class.find({school:school})
//     if(!classes){
//         return res.status(400).json({error:true,message:"no classes found",data:null})
//     }
//     // school.name=name
//     // school.active=active
//     // const updateSchool=await school.save()
//     res.json(({error:false,message:"",data:classes}))
// };
// // const getAllClass=async (req,res)=>
// // {const {school}=req.body
// //     const classes=await
// // }

// const deleteSchool = async (req, res) => {
//     const {_id}=req.body
//     if(!_id){
//         return res.status(400).json({error:true,message:"_id is required!",data:null})
//     }
//     const school=await School.findById(_id)
//     if(!school){
//         return res.status(400).json({error:true,message:"no school found",data:null})
//     }
//     school.deleted="true"
//     const deletedSchool = await school.save();
//         res.json(({error:false,message:"",data:deletedSchool}))

// };

// const deleteClass = async (req, res) => {
//     const {_id}=req.body
//     if(!_id){
//         return res.status(400).json({error:true,message:"_id is required!",data:null})
//     }
//     const classFound=await Class.findById(_id)
//     if(!classFound){
//         return res.status(400).json({error:true,message:"no class found",data:null})
//     }
//     classFound.deleted="true"
//     const deletedClass = await classFound.save();
//         res.json(({error:false,message:"",data:deletedClass}))

// };

// module.exports={getSchools,getAllClassesBySchool,addSchool,addClass,deleteSchool,updateSchool,deleteClass}