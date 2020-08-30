const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = Schema({
    name: String,
    dueDate: Date,
    autoPay: Boolean,
    autoPayAccount: String,
    total: {
        type: Number,
        default: 0.00
    },
    url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categorySchema'
    }
}, {
    timestamps: true
});

const lineItemSchema = Schema({
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'billSchema'
    },
    paymentAmount: {
        type: Number,
        default: 0.00
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categorySchema'
    }
}, {
    timestamps: true
});

const budgetSchema = Schema({
    name: String,
    bills: [ billSchema ],
    paySchedule: String
}, {
    timestamps: true
});

const balanceSchema = Schema({
    date: Date,
    lineItems: [ lineItemSchema ],
    notes: String
}, {
    timestamps: true
});

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
    budget: [ budgetSchema ],
    balances: [ balanceSchema ],
    categories: [ categorySchema ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);