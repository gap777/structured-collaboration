const mongoose = require('./base');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  meetingId: Number,
  questionId: Number,
  response: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
});

responseSchema.pre('save', function (next) {
  this.created_at = this.created_at || new Date();
  this.updated_at = new Date();
  next();
});


module.exports = mongoose.model('Response', responseSchema);

