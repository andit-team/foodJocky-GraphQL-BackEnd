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
        let options = {
            pagination: false,
            sort: {createdAt: -1},
            populate: 'user_or_restaurant'
        }
        if(args.page !== 0){
            options = {
                page: +args.page,
                limit: +args.pagesize,
                sort: {createdAt: -1},
                populate: 'user_or_restaurant'
            }
        }
        let transaction = await GlobalTransaction.paginate(query,options)
        if(transaction.totalDocs === 0){
            let returnData = {
                error: true,
                msg: "No data available",
                data: {
                    docs: transaction.docs,
                    totalDocs: transaction.totalDocs
                }
            }
            return returnData
        }
    
        let returnData = {
            error: false,
            msg: "Transaction data get successfully",
            data: {
                docs: transaction.docs,
                totalDocs: transaction.totalDocs
            }
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