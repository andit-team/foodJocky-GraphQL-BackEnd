const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
CategorySchema.plugin(mongoosePaginate)
const Category = mongoose.model('Category', CategorySchema)
module.exports = Category