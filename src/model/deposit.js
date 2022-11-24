const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose

const depositSchema = new Schema({
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
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

const Deposit = mongoose.model('deposit', depositSchema)
module.exports = Deposit