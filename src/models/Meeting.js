const mongoose = require('./base');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
});

module.exports = mongoose.model('Meeting', meetingSchema);

