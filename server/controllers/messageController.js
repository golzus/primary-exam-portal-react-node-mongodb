// controllers/messageController.js
const Message = require('../models/Message');

// יצירת הודעה חדשה
exports.createMessage = async (req, res) => {
    const { testId, userId, text, type } = req.body;
  
    // בדיקה אם כל השדות הנדרשים קיימים
    if (!testId || !userId || !text || !type) {
      return res.status(400).json({ error: true, message: 'All fields are required', data: null });
    }
  
    try {
      // חיפוש הודעה קיימת עם אותו testId ו-userId
      let message = await Message.findOne({ testId, userId });
  
      if (message) {
        // אם ההודעה קיימת, הוספת תגובה למערך ה-responses
        message.responses.push({ text, type });
      } else {
        // אם ההודעה לא קיימת, יצירת הודעה חדשה
        message = new Message({ testId, userId, responses: [{ text, type }] });
      }
  
      // שמירת ההודעה (בין אם היא חדשה או מעודכנת)
      await message.save();
  
      res.status(201).json({ data: message, error: false, message: "" });
    } catch (error) {
      res.status(500).json({ message: 'Error creating or updating message', error: true, data: null });
    }
  };
  

// קבלת הודעות לפי TESTID
exports.getMessagesByTestId = async (req, res) => {
  const { testId } = req.params;

  try {
    const messages = await Message.find({ testId }).populate('userId');
    res.json({data:messages,error:false,message:""});
  } catch (error) {
    res.status(500).json({error:true,data:null, message: 'Error fetching messages' });
  }
};

// עדכון תגובה כנקראה
exports.markResponseAsRead = async (req, res) => {
  const { messageId, responseIndex } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found',error:true,data:null });
    }
    message.responses[responseIndex].isRead = true; // עדכון סטטוס לקריאה
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error updating response',error:true,data:null });
  }
};
