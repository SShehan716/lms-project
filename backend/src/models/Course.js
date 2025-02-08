const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  code_module: {
    type: String,
    required: true,
  },
  code_presentation: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);