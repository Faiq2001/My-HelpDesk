const Message = require('../models/Message');

// Controller function to get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

// Controller function to add a new message
exports.addMessage = async (req, res) => {
  const { senderId, recipientId, message } = req.body;
  try {
    const newMessage = new Message({ senderId, recipientId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Error adding message' });
  }
};
