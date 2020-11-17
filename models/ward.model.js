/**
 * Word Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const WordSchema = new Schema({

    id: {
        type: Number
    },
    name: {
        type: String
    },
    bn_name: {
        type: String
    },
    municipal_id: {
        type: String
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    }
    
})

const Words = mongoose.model('Words', WordSchema)
module.exports = Words