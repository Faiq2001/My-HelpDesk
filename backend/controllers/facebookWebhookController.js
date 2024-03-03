const Message = require('../models/Message');
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

exports.verifyWebhook = (req, res) => {
    //Get query parameters from request
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if mode and token parameters exist and match the VERIFY_TOKEN
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Respond with the challenge to complete the verification
        res.status(200).send(challenge);
        console.log("GET REQUEST RAN SUCCESSFULLY");
    } else {
        // If verification fails, respond with an error status
        res.sendStatus(403);
    }
};


exports.handleIncomingMessage = (req, res) => {
    // Verify request signature
    try {
        verifyRequestSignature(req, res, req.rawBody);
    } catch (error) {
        console.error('Error verifying request signature:', error);
        res.sendStatus(403); // Respond with forbidden status if signature verification fails
        return;
    }

    // Extract necessary data from req.body
    const { senderId, recipientId, message } = req.body;

    console.log(senderId);
    console.log(recipientId);
    console.log(message);


    // Create a new Message object
    // const newMessage = new Message({
    //     senderId,
    //     recipientId,
    //     message
    // });

    // // Save the new message to MongoDB
    // newMessage.save()
    //     .then(() => {
    //         console.log('Message saved successfully');
    //         res.sendStatus(200);
    //     })
    //     .catch(err => {
    //         console.error('Error saving message:', err);
    //         res.sendStatus(500);
    //     });
};

// Verify request signature
function verifyRequestSignature(req, res, buf) {
    const signature = req.headers['x-hub-signature-256'];

    if (!signature) {
        throw new Error(`Couldn't find "x-hub-signature-256" in headers.`);
    }

    const elements = signature.split('=');
    const signatureHash = elements[1];
    const expectedHash = crypto
        .createHmac('sha256', process.env.APP_SECRET) // Replace 'APP_SECRET' with your actual app secret
        .update(buf)
        .digest('hex');

    if (signatureHash !== expectedHash) {
        throw new Error(`Couldn't validate the request signature.`);
    }
}