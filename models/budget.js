const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = Schema({
    name: {
        type: String,
        default: 'Untitled'
    },
    dueDate: {
        type: Number,
        required: true
    },
    autoPay: {
        type: Boolean,
        default: 0
    },
    autoPayAccount: String,
    total: {
        type: Number,
        default: 0.00
    },
    url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'User.categories'
    }
}, {
    timestamps: true
});

const budgetSchema = Schema({
    name: {
        type: String,
        default: 'Untitled'
    },
    bills: [ billSchema ],
    paySchedule: {
        type: String,
        enum: ['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly'],
        default: 'Semi-Monthly'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);