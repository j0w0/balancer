const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = Schema({
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Budget.bills'
    },
    paymentAmount: {
        type: Number,
        default: 0.00
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'User.categories'
    }
}, {
    timestamps: true
});

const balanceSchema = Schema({
    date: Date,
    lineItems: [ lineItemSchema ],
    notes: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Balance', balanceSchema);