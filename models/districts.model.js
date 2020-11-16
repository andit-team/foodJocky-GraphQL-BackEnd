/**
 * District Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DistrictSchema = new Schema({

    id: {
        type: String
    },
    division_id: {
        type: String
    },
    name: {
        type: String
    },
    bn_name: {
        type: String
    },
    slug: {
        type: String
    },
    url: {
        type: String
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    }
    
})

const Districts = mongoose.model('districts', DistrictSchema)
module.exports = Districts