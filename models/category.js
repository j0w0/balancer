const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String
    },
    bills: [{
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    }],
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

module.exports = mongoose.model('Category', categorySchema);