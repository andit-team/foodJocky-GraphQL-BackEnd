const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PlanSchema = new Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    commision: {
        type: Number,
    },
    duration: {
        type: String,
    },
    feature: {
        type: Boolean,
    }
},
{
    timestamps: true
})

const Plan = mongoose.model('Plans', PlanSchema)
module.exports = Plan