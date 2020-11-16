/**
 * Division Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DivisionSchema = new Schema({

    id: {
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

const Divisions = mongoose.model('divisions', DivisionSchema)
module.exports = Divisions