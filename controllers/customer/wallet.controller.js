const User = require('../../models/user.model')
const Settings = require('../../models/settings.model')
const Transaction = require('../../models/transaction.model')

exports.addBalance = async (root, args, context) => {

    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }

    try {
        let customer = await User.findById(context.user.user_id)
        let address = ""
        let current_balance,previous_balance
        let cashbackPercentange = 20
        if(customer.customer_addresses.length > 0){
            address = customer.customer_addresses[0].address.address
        }
        let cashback = (args.amount * cashbackPercentange)/100
        let amount = args.amount
        let totalAmount = cashback + amount
        
        
        if(customer.balance !== undefined){
            previous_balance = customer.balance
            current_balance = current_balance + totalAmount
        }else{
            previous_balance = 0
            current_balance = totalAmount
        }

        let user = new User({
            current_balance: current_balance,
            previous_balance: previous_balance,
            amount: amount,
            cashback: cashback,
            cashback_percentange: cashbackPercentange,
            debit_or_credit: 'debit',
            reason: 'Add Balance to Wallet',
            status: 'pending',
            user: context.user.user_id
        })
        
        
        let returnData = {
            error: false,
            msg: 'Successfully Added Balance',
            data: {}
        }
        return returnData

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in adding Balance',
            data: {}
        }
        return returnData
    }
}