// const transfer = require('../model/transfer');
const deposit = require('../model/deposit')
const User = require('../model/user')

const transaction = async (req, res) => {
    try {
        
        const transactionTable = await User.aggregate([
            {
                $lookup: {
                    from: "transfers",
                    localField: "userId",
                    foreignField: "_Id",
                    as: "wallet_Fund",
                },
            },
            {
                $lookup: {
                    from: "deposits",
                    localField: "userId",
                    foreignField: "_Id",
                    as: "deposit"
                },
            },
            // {$project: {
            //     "_id":0,
            //     "wallet_Fund._id":0,
            //     "deposit._id":0
            //     }
            //     },
            // {
            //     $limit: 1
            // }
        ])
        console.log(transactionTable)
       return res.status(200).json({
        status: 'success',
        message: 'transaction fetched successfully',
        data: transactionTable
       })
    } catch (error) {
        return error
    }
}

module.exports = {transaction}