const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        question: String,
        options: [String],
        correctAnswer: String,
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
