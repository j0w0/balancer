const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zeroDollars = parseFloat(0).toFixed(2);

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
    autoPayAccount: {
        type: String,
        default: null
    },
    total: {
        type: Number,
        default: 0.00
    },
    url: {
        type: String,
        default: null
    },
    installments: {
        type: Array,
        //default: [zeroDollars,zeroDollars,zeroDollars,zeroDollars]
    },
    budget: {
        type: Schema.Types.ObjectId,
        ref: 'Budget'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    // add in pay schedule columns
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', billSchema);