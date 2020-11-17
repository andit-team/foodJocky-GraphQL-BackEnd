/**
 * Union Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UnionSchema = new Schema({

    id:{
        type: String
    },
    upazila_id: {
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

const Unions = mongoose.model('Unions', UnionSchema)
module.exports = Unions