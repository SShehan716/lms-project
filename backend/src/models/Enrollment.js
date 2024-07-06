const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);