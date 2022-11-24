const mongoose = require('mongoose');

const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true
    },
    lastName: {
        type: String,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 11,
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    otp:{
        type: Number,
        minlength: 4
    },
    pin: {
        type: Number,
        minlength: 4
    },
    balance: {
        type: Number,
        walletType: {
            enum: ["naira", "dollar"]
        }
    },
    createdAt: {
        type: Date, 
        default: () => Date.now(),
        immutable: true
    },
    
})

const User = mongoose.model( 'user', userSchema)
module.exports = User