const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentVleSchema = new Schema({
  id_site: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code_module: {
    type: String,
    required: true,
  },
  code_presentation: {
    type: String,
    required: true,
  },
  date: {
    type: Number, // Number of days from start of module, if following OU dataset
  },
  sum_click: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentVle', studentVleSchema);