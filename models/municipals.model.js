/**
 * Municipal Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MunicipalSchema = new Schema({
    id: {
        type: Number
    },
    district_id: {
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

const Municipals = mongoose.model('Municipals', MunicipalSchema)
module.exports = Municipals