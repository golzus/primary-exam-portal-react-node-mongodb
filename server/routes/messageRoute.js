// routes/messages.js
const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// יצירת הודעה חדשה
router.post('/', messageController.createMessage);

// קבלת הודעות לפי TESTID
router.get('/:testId', messageController.getMessagesByTestId);

// עדכון תגובה כנקראה
router.put('/:messageId/responses/:responseIndex/read', messageController.markResponseAsRead);

module.exports = router;
