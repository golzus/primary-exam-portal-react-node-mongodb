const Company=require("../models/Company")

const getCompanies = async (req, res) => {
    const companies=await Company.find().lean()
    if(!companies.length){
        return res.status(400).json({error:true,message:"no companies",data:null})
    }
    res.json(({error:false,message:"",data:companies}))
};

const getCompany = async (req, res) => {
    res.send("todos")
};

const addCompany = async (req, res) => {
    const image=(req.file?.filename? req.file.filename:"")
    const{name,type,active}=req.body
    if(!name||!type){
        return res.status(400).json({error:true,message:"name aaaa and type are required!",data:null})
    }
    const company=await Company.create({name,type,active,image})
    if(!company){
        return res.status(400).json({error:true,message:"something wrong",data:null})
    }
    res.json(({error:false,message:"",data:company}))

};

const updateCompany = async (req, res) => {
    const{name,type,active,image,_id}=req.body
    if(!name||!type||!_id){
        return res.status(400).json({error:true,message:"name and type and id are required!",data:null})
    }
    const company=await Company.findById(_id)
    if(!company){
        return res.status(400).json({error:true,message:"no company found",data:null})
    }
    company.name=name
    company.type=type
    company.active=active
    company.image=image
    const updateCompany=await company.save()
    res.json(({error:false,message:"",data:updateCompany}))
};

const deleteCompany = async (req, res) => {
    const {_id}=req.body
    if(!_id){
        return res.status(400).json({error:true,message:"_id is required!",data:null})
    }
    const company=await Company.findById(_id)
    if(!company){
        return res.status(400).json({error:true,message:"no company found",data:null})
    }
    const deletedCompany=await Company.deleteOne(company)
    res.json(({error:false,message:"",data:deletedCompany}))

};



module.exports={getCompanies,getCompany,addCompany,updateCompany,deleteCompany}