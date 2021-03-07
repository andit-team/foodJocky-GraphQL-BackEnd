const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const GlobalTransactionsSchema = new Schema({
    current_balance: {
        type: Number
    }, 
    previous_balance: {
        type: Number
    }, 
    amount: {
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
    user_or_restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Users', 'Restaurants']
    },
},
{
    timestamps: true
})
GlobalTransactionsSchema.plugin(mongoosePaginate)
const GlobalTransactions = mongoose.model('GlobalTransactions', GlobalTransactionsSchema)
module.exports = GlobalTransactions