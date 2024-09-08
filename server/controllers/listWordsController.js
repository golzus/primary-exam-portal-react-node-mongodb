const ListWords = require("../models/ListWords");
const Test = require("../models/Test");
const User = require("../models/User");

const getListWordsByClass = async (req, res) => {
  try {
    const { chosenClass: classmate } = req.body;
    const listWords = await ListWords.find({ class: classmate }).lean();
    if (!listWords.length) {
      return res.status(400).json({ error: true, message: "No listWords found", data: null });
    }
    res.json({ error: false, message: "", data: listWords });
  } catch (error) {
    console.error("Error in getListWordsByClass:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getListWordsByClassAndByActive = async (req, res) => {
  try {
    const { chosenClass: classmate, active } = req.body;
    const listWords = await ListWords.find({ class: classmate, active }).lean();
    if (!listWords.length) {
      return res.status(400).json({ error: true, message: "No active listWords found", data: null });
    }
    res.json({ error: false, message: "", data: listWords });
  } catch (error) {
    console.error("Error in getListWordsByClassAndByActive:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getListWords = async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: true, message: "Company is required", data: null });
    }
    const listWords = await ListWords.find({ company }).lean();
    if (!listWords.length) {
      return res.status(400).json({ error: true, message: "No listWords found", data: null });
    }
    res.json({ error: false, message: "", data: listWords });
  } catch (error) {
    console.error("Error in getListWords:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getlistWordById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ error: true, message: "_id is required", data: null });
    }
    const listWord = await ListWords.findById(_id).lean();
    if (!listWord) {
      return res.status(404).json({ error: true, message: "ListWord not found", data: null });
    }
    res.json({ error: false, message: "", data: listWord });
  } catch (error) {
    console.error("Error in getlistWordById:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const addListWords = async (req, res) => {
  try {
    const { title, date, test, class: class1, active, seeWords, countListenToWord } = req.body;
    if (!test) {
      return res.status(400).json({ error: true, message: "Test is required", data: null });
    }

    const listWords = await ListWords.create({
      title,
      date,
      test,
      active,
      countListenToWord,
      seeWords,
      class: class1,
    });

    if (!listWords) {
      return res.status(400).json({ error: true, message: "Failed to create listWords", data: null });
    }

    const students = await User.find({ class: class1 });
    if (!students.length) console.warn("No students found for the class");

    for (const student of students) {
      await Test.create({
        user: student._id,
        active,
        date,
        title,
        seeWords,
        test,
        countListenToWord,
        listWord: listWords._id,
      });
    }

    res.json({ error: false, message: "ListWords created successfully", data: listWords });
  } catch (error) {
    console.error("Error in addListWords:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const updateListWords = async (req, res) => {
  try {
    const { title, date, test, seeWords, countListenToWord, active, _id } = req.body;
    if (!test || !_id) {
      return res.status(400).json({ error: true, message: "Test and _id are required", data: null });
    }

    const listWords = await ListWords.findById(_id);
    if (!listWords) {
      return res.status(404).json({ error: true, message: "ListWords not found", data: null });
    }

    listWords.title = title;
    listWords.countListenToWord = countListenToWord;
    listWords.seeWords = seeWords;
    listWords.active = active;
    listWords.data = date;
    listWords.test = test;

    const updatedListWords = await listWords.save();

    const testsList = await Test.find({ listWord: _id });
    for (const testList of testsList) {
      testList.title = title;
      testList.active = active;
      testList.seeWords = seeWords;
      testList.data = date;
      testList.test = test;
      testList.countListenToWord = countListenToWord;
      await testList.save();
    }

    res.json({ error: false, message: "ListWords updated successfully", data: updatedListWords });
  } catch (error) {
    console.error("Error in updateListWords:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const deleteListWords = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ error: true, message: "_id is required", data: null });
    }

    const listWords = await ListWords.findById(_id);
    if (!listWords) {
      return res.status(404).json({ error: true, message: "ListWords not found", data: null });
    }

    const deletedListWords = await ListWords.deleteOne({ _id });
    res.json({ error: false, message: "ListWords deleted successfully", data: deletedListWords });
  } catch (error) {
    console.error("Error in deleteListWords:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

const getTestsOfAllStudentsById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ error: true, message: "_id is required", data: null });
    }

    const testsStudent = await Test.find({ listWord: _id }).populate("user", { fullname: 1 }).lean();
    res.json({ error: false, message: "", data: testsStudent });
  } catch (error) {
    console.error("Error in getTestsOfAllStudentsById:", error);
    res.status(500).json({ error: true, message: "Server error", data: null });
  }
};

module.exports = {
  getListWords,
  addListWords,
  getlistWordById,
  updateListWords,
  deleteListWords,
  getListWordsByClass,
  getListWordsByClassAndByActive,
  getTestsOfAllStudentsById,
};



 // const ListWords=require("../models/ListWords")
// const ListWords = require("../models/ListWords");
// const Test = require("../models/Test");
// const User = require("../models/User");
// const getListWordsByClass = async (req, res) => {
//   const { chosenClass: classmate } = req.body;
//   try {
//     const listWords = await ListWords.find({ class: classmate }).lean();
//     if (!listWords.length) {
//       return res
//         .status(400)
//         .json({ error: true, message: "no listWords", data: null });
//     }
//     res.json({ error: false, message: "", data: listWords });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// const getListWordsByClassAndByActive = async (req, res) => {
//   const { chosenClass: classmate,active } = req.body;
//   try {
//     const listWords = await ListWords.find({ class: classmate,active }).lean();
//     if (!listWords.length) {
//       return res
//         .status(400)
//         .json({ error: true, message: "no listWords who isn't active", data: null });
//     }
//     res.json({ error: false, message: "", data: listWords });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// const getListWords = async (req, res) => {
//   try {
//     const { company } = req.body;
//     if (!company)
//       return res
//         .status(400)
//         .json({ error: true, message: "company is required", data: null });
//     const listWords = await ListWords.find({ company: company }).lean();
//     if (!listWords.length) {
//       return res
//         .status(400)
//         .json({ error: true, message: "no listWords", data: null });
//     }
//     res.json({ error: false, message: "", data: listWords });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// const getlistWordById = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     if (!_id)
//       return res
//         .status(400)
//         .json({ error: true, message: "_id is required", data: null });
//     const listWord = await ListWords.findById(_id).lean();
//     console.log("hhhhhhhhhhhhhhhh");
//     console.log(listWord, "list");
//     res.json({ error: false, message: "", data: listWord });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// // const getListWords = async (req, res) => {
// //     res.send("todos")
// // };

// const addListWords = async (req, res) => {
//   try {
//     const { title, date, test, class: class1,active, seeWords ,countListenToWord} = req.body;
//     if (!test) {
//       return res
//         .status(400)
//         .json({ error: true, message: "test is required!", data: null });
//     }
// // countListenToWord=num
//     // countListenToWord=countListenToWord.Number
//     const listWords = await ListWords.create({
//       title,
//       date,
//       test,
//       active,
//       countListenToWord,
//       seeWords,
//       class: class1,
//     });
//     if (!listWords) {
//       return res
//         .status(400)
//         .json({ error: true, message: "something wrong", data: null });
//     }

//     //add the listWord for all students
//     const students = await User.find({ class: class1 });
//     if (!students) console.log("no students");
//     for (const student of students) {
//       const newTest = await Test.create({
//         user: student._id,
//         active,
//         date,
//         title,
//         seeWords,
//         test,
//         countListenToWord,
//         listWord: listWords._id,
//       });
//     }

//     res.json({ error: false, message: "", data: listWords });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

// const updateListWords = async (req, res) => {
  
//   try {
//     const { title, date, test, seeWords,countListenToWord, active, _id } = req.body;
//     if (!test || !_id) {
//       return res.status(400).json({
//         error: true,
//         message: "test,_id and company are required!",
//         data: null,
//       });
//     }
//     const listWords = await ListWords.findById(_id);
//     if (!listWords) {
//       return res
//         .status(400)
//         .json({ error: true, message: "no ListWords found", data: null });
//     }
//     listWords.title = title;
//     listWords.countListenToWord=countListenToWord
//     listWords.seeWords = seeWords;
//     listWords.active = active;
//     listWords.data = date;
//     listWords.seeWords=seeWords
//     listWords.test = test;
//     const updateListWords = await listWords.save();
//     //add the listWord for all students
//     const testsList = await Test.find({listWord:_id });
//     for (const testList of testsList) {
//       testList.title = title;
//       // testList.seeWords = seeWords;
//       // testList.active = active;
//       testList.active=active
//       test.active=active
//       test.seeWords=seeWords
//       testList.data = date;
//       testList.test = test;
//       testList.countListenToWord=countListenToWord
//       testList.save();
//     }
//     res.json({ error: false, message: "", data: updateListWords });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

// const deleteListWords = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     if (!_id) {
//       return res
//         .status(400)
//         .json({ error: true, message: "_id is required!", data: null });
//     }
//     const listWords = await ListWords.findById(_id);
//     if (!listWords) {
//       return res
//         .status(400)
//         .json({ error: true, message: "no listWords found", data: null });
//     }
//     const deletedListWords = await ListWords.deleteOne(listWords);
//     res.json({ error: false, message: "", data: deletedListWords });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// const getTestsOfAllStudentsById = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     if (!_id)
//       return res
//         .status(400)
//         .json({ error: true, message: "_id is required", data: null });
//     const testsStudent = await Test.find({listWord:_id}).populate("user",{fullname:1}).lean();
//     console.log(testsStudent,"test");

//     res.json({ error: false, message: "", data: testsStudent });
//   } catch (error) {
//     console.log(error, "error");
//   }
// };


// module.exports = {
//   getListWords,
//   addListWords,
//   getlistWordById,
//   updateListWords,
//   deleteListWords,
//   getListWordsByClass,
//   getListWordsByClassAndByActive,
//   getTestsOfAllStudentsById
// };
