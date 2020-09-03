const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = Schema({
    name: {
        type: String
    },
    paymentAmount: {
        type: Number,
        default: 0.00
    },
    notes: {
        type: String
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