const mongoose = require('mongoose');

const defaultMongoUrl = "mongodb+srv://admin:test@cluster0-vn7rx.mongodb.net/test";

mongoose.connect(process.env.MONGO_URL || defaultMongoUrl);

module.exports = mongoose;

