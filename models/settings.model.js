const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SettingSchema = new Schema({
    delivery_charge: {
        type: Number
    },
    customer_cashback_percentange: {
        type: Number
    },
    google_map_api_key: {
        type: String
    },
    rider_extra_time: {
        type: Number
    },
    restaurant_extra_time: {
        type: Number
    },
    ssl_commerez_store_id: {
        type: String
    },
    ssl_commerez_store_password: {
        type: String
    },
    ssl_commerez_currency: {
        type: String
    },
    ssl_commerez_cus_city: {
        type: String
    },
    ssl_commerez_cus_country: {
        type: String
    },
    customer_vat: {
        type: Number
    },
    restaurant_vat: {
        type: Number
    },
    rider_cost: {
        type: Number
    }
},
{
    timestamps: true
})

const Setting = mongoose.model('Settings', SettingSchema)
module.exports = Setting