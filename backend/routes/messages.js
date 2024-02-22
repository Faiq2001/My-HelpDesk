const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Get all messages
router.get('/', messageController.getAllMessages);

// Add a new message
router.post('/', messageController.addMessage);

module.exports = router;
