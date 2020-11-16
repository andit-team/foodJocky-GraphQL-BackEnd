/**
 * Upazila Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UpazilaSchema = new Schema({

    id:{
        type: String
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

const Upazilas = mongoose.model('Upazilas', UpazilaSchema)
module.exports = Upazilas