const mongoose = require('./base');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  meetingId: Number,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
});

meetingSchema.pre('save', function (next) {
  this.created_at = this.created_at || new Date();
  this.updated_at = new Date();
  next();
});


module.exports = mongoose.model('Meeting', meetingSchema);

