const GlobalTransaction = require('../../models/global.transaction.model')

exports.getAllTransactionsByAdmin = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData
    }
    
    try{
        let query = {
            onModel: 'Users',
            status: args.status,
            debit_or_credit: 'credit'
        }
        let transaction = await GlobalTransaction.find(query).sort({createdAt: -1}).populate('user_or_restaurant')
        let returnData = {
            error: false,
            msg: "Transaction Data Get Successfully",
            data: transaction
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Transaction Data Get Unsuccessful",
            data: {}
        }
        return returnData

    }
}

exports.updateTransactionByAdmin = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData
    }
    
    try{
        let updateTransaction = await GlobalTransaction.updateOne({_id: args._id},{
            status: args.status,
            reason: args.reason
        })

        if(updateTransaction.n < 1){
            let returnData = {
                error: true,
                msg: "Transaction Data Update Unsuccessful"
            }
            return returnData
        }

        let returnData = {
            error: false,
            msg: "Transaction Data Update Successfully"
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Transaction Data Update Unsuccessful"
        }
        return returnData

    }
}