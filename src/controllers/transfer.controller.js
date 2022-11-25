const transfer = require('../model/transfer')
const User = require('../model/user')
const bcrypt = require('bcrypt')

const transferType = async (req, res, next) => {
    let { walletType, accountNumber, amount, pin} = req.body

    let userId = await User.findById(req.params.id)
    // let data = await User.findById(req.params.id)
    // const userId = data._id
    
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

module.exports = {
    transferType
}