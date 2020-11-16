/**
 * Village Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VillageSchema = new Schema({

    id: {
        type: Number
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
    union_id: {
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

const Villages = mongoose.model('Villages', VillageSchema)
module.exports = Villages