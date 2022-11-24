const  deposit = require('../model/deposit');
const dotenv = require('dotenv').config();

const depositType = async (req, res, next) => {

    try {
        const { walletType, amount } = req.body
        let userId = req.params.id
        const Deposit = new deposit({
            userId,
            walletType,
            amount
        })
       const newDeposit = await Deposit.save();
       return res.status(200).json({
        status: 'success',
        message: 'deposit is successful'
       })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    depositType
}