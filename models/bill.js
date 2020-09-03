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
    autoPayAccount: {
        type: String
    },
    total: {
        type: Number,
        default: 0.00
    },
    url: {
        type: String
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