const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CupponSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    discount: {
      type: Number
    },
    minimum_order: {
      type: Number
    },
    start_date:{
      type: Date
    },
    end_date:{
      type: Date
    },
    daily_limit:{
      type: Number
    },
    redeem_limit:{
      type: Number
    },
    status:{
      type: Boolean
    }
})

const Cuppon = mongoose.model('Cuppons', CupponSchema)
module.exports = Cuppon