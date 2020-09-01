const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: String,
}, {
    timestamps: true
});

const userSchema = Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    avatar: String,
    googleId: String,
    categories: [ categorySchema ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);