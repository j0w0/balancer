const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    date: Date,
    // dateFormatted: String,
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