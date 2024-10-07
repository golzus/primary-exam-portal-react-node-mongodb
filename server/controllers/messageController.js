// controllers/messageController.js
const Message = require('../models/Message');

// יצירת הודעה חדשה
exports.createMessage = async (req, res) => {
  const { testId, userId, text, type } = req.body;
  if (!testId)
    console.log(testId, "test");
  // בדיקה אם כל השדות הנדרשים קיימים
  if (!userId || !text || !type) {
    return res.status(400).json({ error: true, message: 'All fields are required', data: null });
  }
  try {
    let message
    if (!testId)
{  
  console.log("yes");
  message = await Message.findOne({ userId ,testId:null});
}    else
      // חיפוש הודעה קיימת עם אותו testId ו-userId
      message = await Message.findOne({ testId, userId });
console.log(message,"message");
    if (message) {
      // אם ההודעה קיימת, הוספת תגובה למערך ה-responses
      message.responses.push({ text, type });
    } else {
      // אם ההודעה לא קיימת, יצירת הודעה חדשה
      if (!testId) {
        console.log("i am");
        message = new Message({ userId, responses: [{ text, type }] });
      }
      else
        message = new Message({ testId, userId, responses: [{ text, type }] });
    }

    // שמירת ההודעה (בין אם היא חדשה או מעודכנת)
    await message.save();
console.log("i did");
    res.status(201).json({ data: message, error: false, message: "" });
  } catch (error) {
    res.status(500).json({ message: 'Error creating or updating message', error: true, data: null });
  }
};


// קבלת הודעות לפי TESTID
exports.getMessagesByTestId = async (req, res) => {
  const { testId,userId } = req.params;
console.log("zxcfghjk");
  try {
    let messages
    if(testId)
     messages = await Message.find({ testId }).populate('userId');
  else
   messages = await Message.find({ userId,testId:null }).populate('userId');
console.log("huhuhu");
    res.json({ data: messages, error: false, message: "" });
  } catch (error) {
    res.status(500).json({ error: true, data: null, message: 'Error fetching messages' });
  }
};

// עדכון תגובה כנקראה
exports.markResponseAsRead = async (req, res) => {
  console.log("i am here");
  const { messageId, responseIndex } = req.params;
  console.log(messageId, "message");
  try {
    const message = await Message.findById({ _id: messageId });
    console.log("i am שךדם  here", message);

    if (!message) {
      return res.status(404).json({ message: 'Message not found', error: true, data: null });
    }
    console.log("more");
    message.responses[responseIndex].isRead = true; // עדכון סטטוס לקריאה
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error updating response', error: true, data: null });
  }
};
