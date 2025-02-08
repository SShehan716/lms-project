const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentRegistrationSchema = new Schema({
  code_module: {
    type: String,
    required: true,
  },
  code_presentation: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date_registration: {
    type: Date,
    required: false,
  },
  date_unregistration: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentRegistration', studentRegistrationSchema);