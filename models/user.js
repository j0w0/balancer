const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    avatar: String,
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);