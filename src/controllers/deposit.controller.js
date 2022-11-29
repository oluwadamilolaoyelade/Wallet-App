const  deposit = require('../model/deposit');
const  User = require('../model/user');
const dotenv = require('dotenv').config();

const depositType = async (req, res, next) => {

    try {
        
        let { walletType, amount } = req.body
        
        let userId = await User.findById(req.params.id);
        let id = userId._id
        const Deposit = new deposit({
            userId,
            walletType,
            amount
        })
       const newDeposit = await Deposit.save();
       const updateBalance = await User.findOneAndUpdate({ _id: id}, { $inc: { balance: newDeposit.amount, walletType: newDeposit.walletType} }, {new: true})
       await updateBalance.save();
       return res.status(200).json({
        status: 'success',
        message: 'deposit is successful',
        data: newDeposit
       })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    depositType
}