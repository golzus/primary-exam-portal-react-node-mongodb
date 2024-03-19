// const ListWords=require("../models/ListWords")
const ListWords= require('../models/ListWords')


const getListWords = async (req, res) => {
    
    const {chosenClass:classmate}=req.body
    
    const listWords=await ListWords.find({class:classmate}).lean()
    
    if(!listWords.length){
        return res.status(400).json({error:true,message:"no listWords",data:null})
    }
    res.json(({error:false,message:"",data:listWords}))
};
// const getListWords = async (req, res) => {
//     const {company}=req.body
//     if(!company)
//     return res.status(400).json({error:true,message:"company is required",data:null})
//     const listWords=await ListWords.find({company:company}).lean()
//     if(!listWords.length){
//         return res.status(400).json({error:true,message:"no listWords",data:null})
//     }
//     res.json(({error:false,message:"",data:listWords}))
// };

// const getListWords = async (req, res) => {
//     res.send("todos")
// };

const addListWords = async (req, res) => {
    const{title,date,test,class:class1}=req.body
    if(!test){
        return res.status(400).json({error:true,message:"test is required!",data:null})
    }
    const listWords=await ListWords.create({title,date,test,class1})
    if(!listWords){
        return res.status(400).json({error:true,message:"something wrong",data:null})
    }
    res.json(({error:false,message:"",data:listWords}))

};

const updateListWords = async (req, res) => {
    const{title,date,test,active,_id}=req.body
    if(!test||!_id){
        return res.status(400).json({error:true,message:"test,_id and company are required!",data:null})
    }
    const listWords=await ListWords.findById(_id)
    if(!listWords){
        return res.status(400).json({error:true,message:"no ListWords found",data:null})
    }
    listWords.title=title
    listWords.active=active
    listWords.data=date
    listWords.test=test
    const updateListWords=await listWords.save()
    res.json(({error:false,message:"",data:updateListWords}))
};

const deleteListWords = async (req, res) => {
    const {_id}=req.body
    if(!_id){
        return res.status(400).json({error:true,message:"_id is required!",data:null})
    }
    const listWords=await ListWords.findById(_id)
    if(!listWords){
        return res.status(400).json({error:true,message:"no listWords found",data:null})
    }
    const deletedListWords=await ListWords.deleteOne(listWords)
    res.json(({error:false,message:"",data:deletedListWords}))

};



 module.exports={getListWords,addListWords,updateListWords,deleteListWords}