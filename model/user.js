const mongoose = require('mongoose');

const { Schema, model } = mongoose

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        uppercase: true
    },
    lastname: {
        type: String,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        minlength: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    otp:{
        type: Number,
        required: true,
        minlength: 4
    },
    pin: {
        type: Number,
        required: true,
        minlength: 4
    },
    createdAt: {
        type: Date, 
        default: () => Date.now(),
        immutable: true
    },
    
})

const User = mongoose.model( 'user', userSchema)
module.exports = User