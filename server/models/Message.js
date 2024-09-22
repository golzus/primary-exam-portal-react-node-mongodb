// models/Message.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
  
    type:String,
    enum:["Student","Teacher"],
    default:"Student"
  },
  isRead: {
    type: Boolean,
    default: false, // כדי לדעת אם התגובה נקראה
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const messageSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test', 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  responses: [responseSchema], // מערך של תגובות
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model('Message', messageSchema);

