const transfer = require('../model/transfer')
const User = require('../model/user')
const bcrypt = require('bcrypt')

const transferType = async (req, res, next) => {
    let { walletType, accountNumber, amount, pin} = req.body

    let userId = await User.findById(req.params.id)
    let id = userId._id
    let userPIn = userId.pin
    try {
        if (userPIn != pin) {
            return res.status(401).json({
                status: 'failed',
                message: 'incorrect pin'
            })
        } else {
            const transferNew = new transfer({
                userId,
                walletType,
                accountNumber,
                amount,
                pin
            })
            const newTransfer = await transferNew.save();
            if (userId.balance <= transferNew.amount) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'insufficient balance'
                })
            }
            const updateBalance = await User.findOneAndUpdate({ _id: id}, { $inc: { balance: -newTransfer.amount, walletType: newTransfer.walletType} }, {new: true})
            await updateBalance.save();
            return res.status(200).json({
                status: 'success',
                message: 'transfer successful',
                data: newTransfer
            })

        }
    } catch (error) {
        return next(error)
    }
}

const oneTransfer = async (req, res) => {
    try {
        const findTransfer = await transfer.findOne(req.params.userId)
        if (!findTransfer) {
            return res.status(401).json({
                message: 'user does not exists'
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'transaction fetched successfully',
                data: findTransfer
            })
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    transferType,
    oneTransfer
}