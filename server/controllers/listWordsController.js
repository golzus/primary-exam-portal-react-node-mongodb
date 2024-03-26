// const ListWords=require("../models/ListWords")
const ListWords = require("../models/ListWords");
const Test = require("../models/Test");
const User = require("../models/User");
const getListWordsByClass = async (req, res) => {
  const { chosenClass: classmate } = req.body;
  try {
    const listWords = await ListWords.find({ class: classmate }).lean();
    if (!listWords.length) {
      return res
        .status(400)
        .json({ error: true, message: "no listWords", data: null });
    }
    res.json({ error: false, message: "", data: listWords });
  } catch (error) {
    console.log(error, "error");
  }
};
const getListWords = async (req, res) => {
  try {
    const { company } = req.body;
    if (!company)
      return res
        .status(400)
        .json({ error: true, message: "company is required", data: null });
    const listWords = await ListWords.find({ company: company }).lean();
    if (!listWords.length) {
      return res
        .status(400)
        .json({ error: true, message: "no listWords", data: null });
    }
    res.json({ error: false, message: "", data: listWords });
  } catch (error) {
    console.log(error, "error");
  }
};
const getlistWordById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ error: true, message: "_id is required", data: null });
    const listWord = await ListWords.findById(_id).lean();
    console.log("hhhhhhhhhhhhhhhh");
    console.log(listWord, "list");
    res.json({ error: false, message: "", data: listWord });
  } catch (error) {
    console.log(error, "error");
  }
};
// const getListWords = async (req, res) => {
//     res.send("todos")
// };

const addListWords = async (req, res) => {
  try {
    const { title, date, test, class: class1, seeWords } = req.body;
    if (!test) {
      return res
        .status(400)
        .json({ error: true, message: "test is required!", data: null });
    }
    const listWords = await ListWords.create({
      title,
      date,
      test,
      seeWords,
      class: class1,
    });
    if (!listWords) {
      return res
        .status(400)
        .json({ error: true, message: "something wrong", data: null });
    }

    //add the listWord for all students
    const students = await User.find({ class: class1 });
    if (!students) console.log("no students");
    for (const student of students) {
      const newTest = await Test.create({
        user: student._id,
        date,
        title,
        test,
        listWord: listWords._id,
      });
    }

    res.json({ error: false, message: "", data: listWords });
  } catch (error) {
    console.log(error, "error");
  }
};

const updateListWords = async (req, res) => {
  try {
    const { title, date, test, seeWords, active, _id } = req.body;
    if (!test || !_id) {
      return res.status(400).json({
        error: true,
        message: "test,_id and company are required!",
        data: null,
      });
    }
    const listWords = await ListWords.findById(_id);
    if (!listWords) {
      return res
        .status(400)
        .json({ error: true, message: "no ListWords found", data: null });
    }
    listWords.title = title;
    listWords.seeWords = seeWords;
    listWords.active = active;
    listWords.data = date;
    listWords.test = test;
    const updateListWords = await listWords.save();
    //add the listWord for all students
    const testsList = await Test.find({listWord:_id });
    for (const testList of testsList) {
      testList.title = title;
      // testList.seeWords = seeWords;
      // testList.active = active;
      testList.data = date;
      testList.test = test;
      testList.save();
    }
    res.json({ error: false, message: "", data: updateListWords });
  } catch (error) {
    console.log(error, "error");
  }
};

const deleteListWords = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ error: true, message: "_id is required!", data: null });
    }
    const listWords = await ListWords.findById(_id);
    if (!listWords) {
      return res
        .status(400)
        .json({ error: true, message: "no listWords found", data: null });
    }
    const deletedListWords = await ListWords.deleteOne(listWords);
    res.json({ error: false, message: "", data: deletedListWords });
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = {
  getListWords,
  addListWords,
  getlistWordById,
  updateListWords,
  deleteListWords,
  getListWordsByClass,
};
