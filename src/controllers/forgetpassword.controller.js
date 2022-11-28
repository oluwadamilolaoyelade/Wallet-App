const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require("../services/sendEmail")
const User = require('../model/user');


const forgetPassword = async(req, res) => {
    let { email } = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        if (!existingEmail) {
            return res.status(400).json({
                status: 'failed',
                message: 'email does not exist'
            });
        }
        
        const user = await User.findOne({ email });
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: "45min"})
        

        const resetLink = `http://localhost:8080/reset_password?token=${token}`
        console.log(resetLink)
        sendMail(email, resetLink)
        return res.status(200).json({
            status: 'success',
            message: ' we have sent a reset link to your registered email address.'
        });
    } catch (error) {
        return error;
    }
};

const resetPassword = async(req, res) => {
    let { password} = req.body;
    let email = req.user.id
    console.log(email)
    try {
        password = bcrypt.hashSync(password, 10)
        console.log(password)
        const user = await User.findOneAndUpdate({email: email}, { $set: { password: password} })
        const newUser = await user.save();
        console.log(newUser)
        return res.status(200).json({
            status: 'success',
            message: 'password reset successfully',
            data: newUser
        })
    } catch (error) {
        return error
    }
}

module.exports = {
    forgetPassword,
    resetPassword

}