const mongoose = require('mongoose')

const { Schema, SchemaTypes, model } = mongoose

const transactionSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    wallet_type: {
        type: String,
        required: true
    },
    accountnumber: {
        type: String
    },
    amount: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now
    },
    updatedAt: {
        type: Date,
        default: () => Date.now
    }
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction