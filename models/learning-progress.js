const mongoose = require('mongoose')

const learningProgressSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    chapter_1: {
        enrollment: {
            type: String,
            enum: ['Not started', 'In progress', 'Completed'],
            default: 'Not started'
        },
        chapterRewards: {
            type: Number,
            default: 300
        }
    },
    chapter_2: {
        enrollment: {
            type: String,
            enum: ['Not started', 'In progress', 'Completed'],
            default: 'Not started'
        },
        chapterRewards: {
            type: Number,
            default: 500
        }
    },
    chapter_3: {
        enrollment: {
            type: String,
            enum: ['Not started', 'In progress', 'Completed'],
            default: 'Not started'
        },
        chapterRewards: {
            type: Number,
            default: 900
        }
    }
})

module.exports = mongoose.model('learning_progress', learningProgressSchema, 'learningProgress')