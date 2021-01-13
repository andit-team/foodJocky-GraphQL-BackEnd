const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SettingSchema = new Schema({
    delivery_charge: {
        type: Number
    }
},
{
    timestamps: true
})

const Setting = mongoose.model('Settings', SettingSchema)
module.exports = Setting