const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    authService: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: false
    },
    joinedOn: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema, 'users')