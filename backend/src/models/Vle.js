const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vleSchema = new Schema({
  id_site: {
    type: Number,
    required: true,
    unique: true,
  },
  code_module: {
    type: String,
    required: true,
  },
  code_presentation: {
    type: String,
    required: true,
  },
  activity_type: {
    type: String,
  },
  week_from: {
    type: Number,
  },
  week_to: {
    type: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('Vle', vleSchema);