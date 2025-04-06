const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database error");
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnect