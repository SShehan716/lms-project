const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentInfoSchema = new Schema({
  code_module: {
    type: String,
    required: true,
  },
  code_presentation: {
    type: String,
    required: true,
  },
  // Link to  User model, instead of using id_student as an integer
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gender: {
    type: String,
  },
  imd_band: {
    type: String,
  },
  highest_education: {
    type: String,
  },
  age_band: {
    type: String,
  },
  num_of_prev_attempts: {
    type: Number,
  },
  studied_credits: {
    type: Number,
  },
  region: {
    type: String,
  },
  disability: {
    type: String,
  },
  final_result: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentInfo', studentInfoSchema);