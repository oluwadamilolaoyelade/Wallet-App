const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose

const transferSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    walletType:{
            type: String,
            enum: ["naira", "dollar"],
            required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now,
        immutable: true
    }
})

const Deposit = mongoose.model('deposit', transferSchema)
module.exports = Deposit