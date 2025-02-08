const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentAssessmentSchema = new Schema({
  // user references your "User" schema
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Link to an assessment (see the "Assessment" model below) 
  id_assessment: {
    type: Number,
    required: true,
  },
  date_submitted: {
    type: Number, // or Date
  },
  is_banked: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentAssessment', studentAssessmentSchema);