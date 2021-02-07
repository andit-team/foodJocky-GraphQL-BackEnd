const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PlanSchema = new Schema({
    title: {
        type: String,
    },
    commision: {
        type: Number,
    },
    feature: {
        type: String,
    }
},
{
    timestamps: true
})

const Plan = mongoose.model('Plans', PlanSchema)
module.exports = Plan