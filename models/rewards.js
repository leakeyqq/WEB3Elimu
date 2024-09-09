const mongoose = require('mongoose')

const rewardsSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    coinsEarnedOnChapters: {
        type: Number,
        default: 0
    },
    coinsEarnedOnReferring: {
        type: Number,
        default: 0
    },
    coinsBalance: {
        type: Number,
        default: 0
    },
    coinsWithdrawn: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('rewards', rewardsSchema, 'rewards')