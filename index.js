require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {connectDB} = require('./db/mongoDB');
const suppliesRouter = require('./router/suppliesRouter');

// Constants
const port = process.env.PORT || 3000;
const app = express();

module.exports = app;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/supplies', suppliesRouter);

// Connect to MongoDB
connectDB();

// Listen on the specified port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
