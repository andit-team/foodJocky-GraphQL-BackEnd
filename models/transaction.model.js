const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
TransactionsSchema.plugin(mongoosePaginate)
const Transactions = mongoose.model('Transactions', TransactionsSchema)
module.exports = Transactions