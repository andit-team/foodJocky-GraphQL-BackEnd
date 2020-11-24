const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrdersSchema = new Schema({
    items: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: String,
            size: String,
            quantity: Number,
            price: Number
        }
    ],
    total: {
        type: Number
    },
    status: {
        type: String
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    rej_reason: {
        type: String
    },
    rider: {
        type: mongoose.Schema.Types.ObjectId,               //Rider will be assigned later
        ref: 'Users',
    },
    sub_total: {
        type: Number
    },
    delivery_fee: {
        type: Number
    },
    order_type: {
        type: String
    },
    pack_price: {
        type: Number
    },
    voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vouchers',
    },
    offer: {
        type: Number
    },
    quality:{
        type: String
    },
    division: {
        type: String,
    },
    district: {
      type: String,
    },
    municipal: {
      type: String,
    },
    ward: {
      type: String,
    },
    upazila: {
      type: String,
    },
    union: {
      type: String,
    },
    village: {
      type: String,
    },
},
{
    timestamps: true
})

const Orders = mongoose.model('Orders', OrdersSchema)
module.exports = Orders