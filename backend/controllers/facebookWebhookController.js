const Message = require('../models/Message');
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

exports.verifyWebhook = (req, res) => {
    console.log("GET REQUEST RAN SUCCESSFULLY")
    //Get query parameters from request
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if mode and token parameters exist and match the VERIFY_TOKEN
    if (mode && token === VERIFY_TOKEN) {
        // Respond with the challenge to complete the verification
        res.status(200).send(challenge);
    } else {
        // If verification fails, respond with an error status
        res.sendStatus(403);
    }
};


exports.handleIncomingMessage = (req, res) => {
    // Extract necessary data from req.body
    const { senderId, recipientId, message } = req.body;

    // Create a new Message object
    const newMessage = new Message({
        senderId,
        recipientId,
        message
    });

    // Save the new message to MongoDB
    newMessage.save()
        .then(() => {
            console.log('Message saved successfully');
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Error saving message:', err);
            res.sendStatus(500);
        });
};