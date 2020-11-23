const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AgentAreaPlanSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    key: {
        type: String,
        unique: true
    },
    own_commission: {
        type: Number
    },
    child_commission: {
        type: Number
    }
},
{
    timestamps: true
})

const AgentAreaPlan = mongoose.model('agent_area_plan', AgentAreaPlanSchema)
module.exports = AgentAreaPlan