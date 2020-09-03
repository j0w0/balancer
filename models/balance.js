const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    },
    startingBalance: {
        type: Number,
        default: 0.00
    },
    lineItems: [{
        type: Schema.Types.ObjectId,
        ref: 'LineItem'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Balance', balanceSchema);