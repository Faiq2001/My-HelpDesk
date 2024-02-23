const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

require('dotenv').config();

const registrationRoutes = require('./routes/registration');
const loginRoutes = require('./routes/login');
const facebookWebhookRoutes = require('./routes/facebookWebhook'); // Import Facebook webhook routes
const Message = require('./models/Message'); // Import Message model

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
    console.log(`Connected to MongoDB & Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use(registrationRoutes);
app.use(loginRoutes);
app.use(facebookWebhookRoutes);

module.exports = app;