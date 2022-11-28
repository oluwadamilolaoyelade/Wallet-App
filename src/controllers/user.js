const User = require("../model/user");
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendOtp  = require('../services/sendOtp')

const { generateOTP } = require('../services/otp')

const signUp = async (req, res, next) => {

    try {
        let { firstName, lastName, email, phoneNumber, password} = req.body;
        const existingEmail = await User.findOne({ email });
        const token = await jwt.sign({ id: email }, process.env.JWT_SECRET_KEY)
        console.log(token)

        if (existingEmail) {
            return res.status(400).json({
                status: 'failed',
                message: `${email} has been registered already`
            });
        } else {
            password = await bcrypt.hash(password, 10);
            const otp = generateOTP();
            console.log(otp)
            const newUser = new User({
                firstName, 
                lastName, 
                email, 
                phoneNumber, 
                password,
                otp,
                token
            });
            await sendOtp(email, otp)
            await newUser.save();
            console.log(newUser)

            return res.status(200).json({
                status: 'successful',
                message: 'verify your account',
                data: newUser, token
            })
        }
    } catch (error) {
        return next(error)
    }
}

const verifyAccount = async (req, res) => {
    let { otp } = req.body
    let email = req.user.id
    try {
        const user = await User.findOne({email});
        const userOtp = user.otp
        console.log(userOtp)
        if (otp !== userOtp) {
            return res.status(401).json({
                message: 'invalid OTP'
            })
        } else {
            const updatedUser = await User.findByIdAndUpdate(user._id, {
                $set: {otp: otp}
            })
            await updatedUser.save();
            return res.status(200).json({
                status: 'success',
                message: 'account verified, user signed up succcessfully',
                data: user
            })
        }

        
    } catch (error) {
        return error
    }
}

const login = async(req, res, next) => {
    let {email, password} = req.body
    try {
        
        const data = await User.findOne({ email });
        const existingEmail = await User.findOne({ email });
        if (!existingEmail) {
            return res.status(403).json({
                status: 'failed',
                message: 'email does not exists'
            })

        } else {
            const passwordMatch = await bcrypt.compare(password, existingEmail.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'invalid password'
                })

            } else {
                const token  = await jwt.sign({ id: data._id}, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.status(200).json({
                    status: 'successful',
                    message: 'logged in successfully',
                    data: data,
                    token: token
                })
            }
        }
        
        
    } catch (error) {
        return next(error)
    }

}

const createPin = async(req, res, next) => {
    const { pin } = req.body

    try {
        let userId = await User.findById(req.params.id)
        const id = userId._id

        if (!id) {
            return res.status(401).json({
                message: 'user does not exist'
            }) 
        } else {
            const newPin = await User.findOneAndUpdate({ _id: id}, { $set: { pin: pin}}, {new: true})
            const data = await newPin.save();
            return res.status(200).json({
                status: 'success',
                message: 'pin succefully created',
                data: data
            })
        }
    } catch (error) {
        return next(error)
    }
}

const oneUser = async (req, res) => {
    
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(401).json({
                    message: 'user does not exist'
                })
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'user fetched successfully',
                    data: user
                })
            }
        } catch (error) {
            return error
        }
    
}

module.exports = {
    signUp,
    login,
    createPin,
    oneUser,
    verifyAccount
}