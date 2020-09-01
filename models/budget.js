const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = Schema({
    name: {
        type: String,
        default: 'Untitled'
    },
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