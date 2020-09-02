const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = Schema({
    name: String,
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Budget'
    },
    paymentAmount: {
        type: Number,
        default: 0.00
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    balance: {
        type: Schema.Types.ObjectId,
        ref: 'Balance'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LineItem', lineItemSchema);