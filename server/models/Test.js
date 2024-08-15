const mongoose = require("mongoose");
const User = require("./User");
const TestsArraySubSchema=require('./SubSchema/TestsArraySubSchema');
const Class = require("./Class");
const ListWords = require("./ListWords");
const TestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    listWord:{
      type: mongoose.Schema.Types.ObjectId,
ref:ListWords
    },
    date:{
      type:mongoose.Schema.Types.Date
    },
    title:{
      type:String
    },
    test:{
      type:[]
    },
    avgMarks: {
      type: BigInt,
    },
    countListenToWord:{
      type:Number,
      default:5
  },
  active:{
    type:Boolean,
    default:false
        },
    complete:{
      type:Boolean,
      default:false
    },
  mark:{
    type:Number,
    default:0
  },
  seeWords:{
    type:Boolean,
    default:true
},
    TestArray:[TestsArraySubSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
