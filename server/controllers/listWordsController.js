// const ListWords=require("../models/ListWords")
const ListWords= require('../models/ListWords')


const getListWords = async (req, res) => {
    const listWords=await ListWords.find().lean()
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
    const{title,date,company,test}=req.body
    if(!test||!company){
        return res.status(400).json({error:true,message:"test  and company are required!",data:null})
    }
    const listWords=await ListWords.create({title,date,company,test})
    if(!listWords){
        return res.status(400).json({error:true,message:"something wrong",data:null})
    }
    res.json(({error:false,message:"",data:listWords}))

};

const updateListWords = async (req, res) => {
    const{title,date,company,test,active,_id}=req.body
    if(!test||!company||!_id){
        return res.status(400).json({error:true,message:"test,_id and company are required!",data:null})
    }
    const listWords=await ListWords.findById(_id)
    if(!listWords){
        return res.status(400).json({error:true,message:"no ListWords found",data:null})
    }
    listWords.company=company
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