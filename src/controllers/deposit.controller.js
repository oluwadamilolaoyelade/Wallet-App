const  deposit = require('../model/deposit');
const  User = require('../model/user');
const dotenv = require('dotenv').config();

const depositType = async (req, res, next) => {

    try {
        
        let { walletType, amount } = req.body
        
        let userId = await User.findById(req.params.id);
        const Deposit = new deposit({
            userId,
            walletType,
            amount
        })
       const newDeposit = await Deposit.save();
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