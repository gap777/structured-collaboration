const mongoose = require('mongoose');

const defaultMongoUrl = "mongodb+srv://admin:test@cluster0-vn7rx.mongodb.net?dbName=development&authSource=admin";

mongoose.connection.on('connected', function() {
  // Hack the database back to the right one, because when using mongodb+srv as protocol.
  if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
    mongoose.connection.db = mongoose.connection.client.db('development');
  }
  console.log('Connection to MongoDB established.')
});

mongoose.connect(process.env.MONGO_URL || defaultMongoUrl);

module.exports = mongoose;

