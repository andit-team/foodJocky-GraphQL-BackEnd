const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    image_url: {
        type: String,
        required: true
    }, 
},
{
    timestamps: true
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category