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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    },
    balance: {
        type: Schema.Types.ObjectId,
        ref: 'Balance'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LineItem', lineItemSchema);