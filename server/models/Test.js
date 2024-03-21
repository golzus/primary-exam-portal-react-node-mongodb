const mongoose = require("mongoose");
const User = require("./User");
const TestsArraySubSchema=require('./SubSchema/TestsArraySubSchema')
const TestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    avgMarks: {
      type: BigInt,
    },
    TestArray:[TestsArraySubSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
