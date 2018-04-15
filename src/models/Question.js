const mongoose = require('./base');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  meetingId: Number,
  questionText: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
});

questionSchema.pre('save', function (next) {
  this.created_at = this.created_at || new Date();
  this.updated_at = new Date();
  next();
});


module.exports = mongoose.model('Question', questionSchema);

