const User = require('../model/user')

const transaction = async (req, res) => {
    try {
        const page = req.query.page || 0
        const noOfPage = 1
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
        ])
        .skip(page * noOfPage)
        .limit(noOfPage)

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
const transactionPage = async (req, res) => {
    try {
        const page = req.query.page || 0
        const noOfPage = 1
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
        ])
        .skip(page * noOfPage)
        .limit(noOfPage)

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
const transactionSearch = async (req, res) => {
    console.log(req.body)
    try {
        
        const transactionTable = await User.aggregate([
            // {
            //     $match: {
                    
            //             $search: req.body.text
                
            //     }
            // },
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
            {
                $addFields: {
                  searcher: {
                        $regexMatch: {
                          input: "$firstName",
                          regex: req.body.text,
                          options: 'i'
                        }
                  }
                }
              },
              {
                $match: {
                  searcher: true
                }
              },
            
        ])
        console.log(transactionTable)
       return res.status(200).json({
        status: 'success',
        message: 'transaction fetched successfully',
        data: transactionTable
       })
    } catch (error) {
        console.log(error)

    }
}

module.exports = {
    transaction,
    transactionPage,
    transactionSearch
}