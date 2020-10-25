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
    },
    discount_by_restaurant: {
        type: Number
    },
    discount_by_foodjocky: {
        type: Number
    }
})

const Plan = mongoose.model('Plans', PlanSchema)
module.exports = Plan