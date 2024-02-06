const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.xq0yhmm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {connectDB};