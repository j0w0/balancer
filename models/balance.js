const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    date: {
        type: Date,
        default: Date.now
    },
    notes: String,
    startingBalance: {
        type: Number,
        default: 0.00
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Balance', balanceSchema);