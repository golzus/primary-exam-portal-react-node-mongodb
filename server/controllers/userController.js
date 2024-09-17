const bcrypt = require("bcrypt");
const Class = require("../models/Class");
const User = require("../models/User");

const checkIfUsernameExist = async (req,res)=>{
  try{
    const {username}=req.body;
    if (!username) 
      return res.status(400).json({ error: true, message: "no id", data: null });
    
    const user=await User.find({username:username})
    if(user.length>0)
        return res.status(200).json({ error: true, message: "שם משתמש תפוס", data: null });
  
  if(user.length===0)
    return res.status(200).json({ error: true, message: "", data: null });
}
  catch (error) {
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
}
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false }, { password: 0 }).populate("class").lean();
    if (!users) {
      return res.status(200).json({ error: true, message: "no users", data: null });
    }
    res.json({ error: false, message: "", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getUserById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ error: true, message: "no id", data: null });
    }
    const user = await User.find({ _id: _id, deleted: false }, { password: 0 }).populate("class").lean();
    if (!user) {
      return res.status(400).json({ error: true, message: "no user", data: null });
    }
    res.json({ error: false, message: "", data: user[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getUser = async (req, res) => {
  try {
    res.send("todos");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getUsersByClass = async (req, res) => {
console.log("hello");
  try {
    const { chosenClass } = req.body;
 
    if (!chosenClass) {
      return res.status(400).json({
        error: true,
        message: "classStudent is required!",
        data: null,
      });
    } 
   
       const classes = await User.find({ deleted: false,class:chosenClass }, { password: 0 }).populate("class").lean();

    if (!classes) {
      return res.status(200).json({ error: false, message: "no students", data: null });
    }
    console.log(classes,"classes");
    res.json({ error: false, message: "", data: classes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const addUser = async (req, res) => {
  try {
    const { fullname, username, password, class: class1, active, type, email, roles } = req.body;
    if (!username || !password || !fullname) {
      return res.status(400).json({
        error: true,
        message: "fullname, username, password, roles are required!",
        data: null,
      });
    }
    const duplicateUser = await User.findOne({ username });
    if (duplicateUser) {
      return res.status(409).json({
        error: true,
        message: "duplicateUser",
        data: null,
      });
    }

    const hashpwd = await bcrypt.hash(password, 10);
    const newUser = { fullname, username, password: hashpwd, active, type, email, roles };
    if (class1) newUser.class = class1;

    const user = await User.create(newUser);
    if (!user) {
      return res.status(400).json({ error: true, message: "something wrong", data: null });
    }
    res.json({ error: false, message: "", data: { username: user.username, _id: user._id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, fullname, username, password, active, roles, email } = req.body;
    if (!username || !fullname || !_id) {
      return res.status(400).json({
        error: true,
        message: "all fields are required!",
        data: null,
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ error: true, message: "no user found", data: null });
    }

    if (password) {
      const hashpwd = await bcrypt.hash(password, 10);
      user.password = hashpwd;
    }
    user.fullname = fullname;
    user.roles = roles;
    user.username = username;
    user.active = active;
    user.email = email;

    const updateUser = await user.save();
    res.json({ error: false, message: "", data: { username: updateUser.username, _id: updateUser._id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ error: true, message: "id is required!", data: null });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ error: true, message: "no user found", data: null });
    }

    user.deleted = true;
    const updateUser = await user.save();
    res.json({
      error: false,
      message: "",
      data: { username: updateUser.username, _id: updateUser._id, deleted: updateUser.deleted },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

module.exports = { getUsers, getUser,checkIfUsernameExist, addUser, updateUser, getUserById, deleteUser, getUsersByClass };



// const bcrypt = require("bcrypt");
// const Class =require("../models/Class")
// const User = require("../models/User");

// const getUsers = async (req, res) => {
//   // const users = await User.find({deleted:false},{password:0,}).populate("company").lean();
//   const users = await User.find({deleted:false},{password:0,}).populate("class").lean();

//   // const users = await User.find().lean({username:false},{password:0});
//   if (!users) {
//     return res
//       .status(200)
//       .json({ error: true, message: "no users", data: null });
//   }
//   res.json({ error: false, message: "", data: users });
// };


// const getUserById = async (req, res) => {
// try {
  


//   const {_id}=req.body

//   if(!_id) return res
//   .status(400)
//   .json({ error: true, message: "no id", data: null });
//   // const users = await User.find({deleted:false},{password:0,}).populate("company").lean();
//   const user = await User.find({_id:_id,deleted:false},{password:0,}).populate("class").lean();
// console.log(_id);
//   // const users = await User.find().lean({username:false},{password:0});
//   if (!user) {
//     return res
//       .status(400)
//       .json({ error: true, message: "no user", data: null });
//   }
//   console.log(user,"user");
//   res.json({ error: false, message: "", data: user[0] });
// } catch (error) {
//   console.log(error);
// }
// };
// // const getUsersByCompany = async (req, res) => {
// //   const {_id}=
// //   const users = await User.find({deleted:false,},{password:0}).populate("company").lean();
// //   // const users = await User.find().lean({username:false},{password:0});

// //   if (!users) {
// //     return res
// //       .status(400)
// //       .json({ error: true, message: "no users", data: null });
// //   }
// //   res.json({ error: false, message: "", data: users });
// // };


// const getUser = async (req, res) => {
//   res.send("todos");
// };
// const getUsersByClass= async (req,res)=>{
//   const {classStudent} =req.body
//   if(!classStudent) return res
//   .status(400)
//   .json({
//     error: true,
//     message: "classStudent is required!",
//     data: null,
//   });
// const classes=await User.find({class:classStudent}).lean()

// if(!classes) return res
// .status(400)
// .json({
//   error: true,
//   message: "no students",})
// console.log(classes,"classes");
//   res.json({ error: false, message: "", data:classes });
// }


// const addUser = async (req, res) => {
//   const { fullname, username, password,class:class1, active,  type,email,roles } = req.body;
//   // if (!username || !password || !fullname || !company || !roles) {
//     if (!username || !password || !fullname) {

//     return res
//       .status(400)
//       .json({
//         error: true,
//         message: "fullname,username,password,roles are required!",
//         data: null,
//       });
//   }
// const duplicateUser=await User.findOne({username})
// if(duplicateUser){
//     return res
//     .status(409)
//     .json({
//       error: true,
//       message: "duplicateUser",
//       data: null,
//     });
// }

//   const hashpwd=await bcrypt.hash(password,10)
//   const newUser={fullname, username, password : hashpwd, active, type,email,roles}
//    if(class1)
//     newUser.class=class1
//   const user = await User.create(newUser);

//   if (!user) {
//     return res
//       .status(400)
//       .json({ error: true, message: "something wrong", data: null });
//   }
//   res.json({ error: false, message: "", data: {username:user.username,_id:user._id} });
// };

// const updateUser = async (req, res) => {
//   try {
    
 
//   const {_id, fullname, username, password, active, roles,email} = req.body;
//   // if (!username  || !fullname || !company || !type||!_id) {
//     if (!username  || !fullname||!_id) {

//     return res
//       .status(400)
//       .json({
//         error: true,
//         message: "all fields are required!",
//         data: null,
//       });
//   }
//   const user = await User.findById(_id);
//   if (!user) {
//     return res
//       .status(400)
//       .json({ error: true, message: "no user found", data: null });
//   }
//   if(password){
//     const hashpwd=await bcrypt.hash(password,10)
// user.password=hashpwd 
//   }
//   user.fullname = fullname;
//   user.roles=roles
//   user.username = username;
//   user.active = active;
//   user.email=email;
//   const updateUser = await user.save();
//   res.json({ error: false, message: "", data:  {username:updateUser.username,_id:updateUser._id} });
// } catch (error) {
//     console.log(error);
// }
// };

// const deleteUser = async (req, res) => {
//   const { _id } = req.body;
//   if (!_id) {
//     return res
//       .status(400)
//       .json({ error: true, message: "id is required!", data: null });
//   }
//   const user = await User.findById(_id);
//   if (!user) {
//     return res
//       .status(400)
//       .json({ error: true, message: "no user found", data: null });
//   }
//   user.deleted=true
//   const updateUser = await user.save();
//   res.json({ error: false, message: "", data:  {username:updateUser.username,_id:updateUser._id,deleted:updateUser.deleted} });
// };

// module.exports = { getUsers, getUser, addUser, updateUser,getUserById, deleteUser,getUsersByClass };
