const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TransactionsSchema = new Schema({
    current_balance: {
        type: Number
    }, 
    previous_balance: {
        type: Number
    }, 
    amount: {
        type: Number
    },
    cashback: {
        type: Number
    },
    cashback_percentange: {
        type: Number
    },
    debit_or_credit: {
        type: String
    },
    reason: {
        type: String
    },
    status: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    validate_response: {
        type: Object
    }
},
{
    timestamps: true
})

const Transactions = mongoose.model('Transactions', TransactionsSchema)
module.exports = Transactions