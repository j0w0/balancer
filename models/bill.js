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
        ref: 'Category'
    },
    budget: {
        type: Schema.Types.ObjectId,
        ref: 'Budget'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', billSchema);