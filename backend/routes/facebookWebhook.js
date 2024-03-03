const express = require('express');
const router = express.Router();
const facebookWebhookController = require('../controllers/facebookWebhookController');

// Handle GET request for webhook verification
router.get("/webhook", facebookWebhookController.verifyWebhook);

// Handle POST request for incoming messages
router.post("/webhook", facebookWebhookController.handleIncomingMessage);

module.exports = router;
