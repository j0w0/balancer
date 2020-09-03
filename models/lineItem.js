const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = Schema({
    name: {
        type: String
    },
    transactionAmount: {
        type: Number,
        default: 0.00
    },
    notes: {
        type: String
    },
    transactionType: {
        type: String,
        enum: ['Deposit', 'Withdrawal'],
        default: 'Withdrawal'
    },
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Bill',
        default: null
    },
    balance: {
        type: Schema.Types.ObjectId,
        ref: 'Balance'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('LineItem', lineItemSchema);