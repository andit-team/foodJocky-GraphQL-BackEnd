const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OtpSchema = new Schema({
    mobile: {
        type: String,
        unique: true,
        required: true
    }, 
    otp: {
        type: Number,
        required: true
    },
    count: {
        type: Number
    },
    expireAt: {
        type: Date, 
        default: Date.now,
    }
},
{
    timestamps: true
})

OtpSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 120 } )

const Otp = mongoose.model('Otps', OtpSchema)
module.exports = Otp