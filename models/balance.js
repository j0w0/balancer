const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    date: Date,
    notes: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Balance', balanceSchema);