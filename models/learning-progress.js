const mongoose = require('mongoose')

const learningProgressSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    currentChapter: {
        type: Number,
        default: 0
    },
    chapter_1: {
        type: String,
        enum: ['Start chapter', 'In progress', 'completed'],
        default: 'Not started'
    },
    chapter_2: {
        type: String,
        enum: ['Start chapter', 'In progress', 'completed'],
        default: 'Start chapter'
    },
    chapter_3: {
        type: String,
        enum: ['Start chapter', 'In progress', 'completed'],
        default: 'Start chapter'
    }
})

module.exports = mongoose.model('learning_progress', learningProgressSchema, 'learningProgress')