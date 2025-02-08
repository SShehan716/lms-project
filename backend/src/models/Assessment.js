const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentSchema = new Schema({
  code_module: {
    type: String,
    required: true,
  },
  code_presentation: {
    type: String,
    required: true,
  },
  id_assessment: {
    type: Number, // used as a unique ID in the OU dataset
    required: true,
    unique: true,
  },
  assessment_type: {
    type: String,
  },
  date: {
    type: Number, // e.g. day relative to start of module
  },
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);