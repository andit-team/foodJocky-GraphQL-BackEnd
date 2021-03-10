const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const RestaurantsSchema = new Schema({
    user:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String
    },
    name:{
        type: String
    },
    restaurant_or_homemade: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plans',
    },
    tags: [],
    description:{
        type: String
    },
    discount_given_by_restaurant: {
        type: Number
    },
    discount_given_by_admin: {
        type: Number
    },
    cover_img: {
        type: String
    },
    thumb_img: {
        type: String
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    address: {
        address: {
            type: String
        },
        location: {
            lat: String,
            lng: String
        }
    },
    ratings:[
        {
            rate: Number,
            comment: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            },
            date: Date
        }
    ],
    rating: {
        type: Number
    },
    rating_count: {
        type: Number
    },
    food_categories:[
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: String,
            foods: [
                {
                    _id: mongoose.Schema.Types.ObjectId,
                    name: String,
                    description: String,
                    dish_img: String,
                    price: Number,
                    active: Boolean,
                    commission: Number,
                    price_and_size: [
                        {
                            size: String,
                            price: Number
                        }
                    ]
                }
            ]
        }
    ],
    price_type: {
        type: String            // $, $$, $$$, $$$$
    },
    division: {
        type: String
    },
    district: {
      type: String
    },
    residential_or_municipal: {
        type: String
    },
    municipal: {
      type: String
    },
    ward: {
      type: String
    },
    upazila: {
      type: String
    },
    union: {
      type: String
    },
    village: {
      type: String
    },
    balance: {
        type: Number
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    shop_days:[{
        day: {
            type: Number
        },
        start_time: {
            hour: {
                type: Number
            },
            minute: {
                type: Number
            }
        },
        end_time: {
            hour: {
                type: Number
            },
            minute: {
                type: Number
            }
        },
        status: {
            type: Boolean
        }
    }],
    status: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    rejection_msg:{
        type: String
    },
    vat: {
        type: Boolean
    },
    rider_cost: {
        type: Boolean
    }
    
},
{
    timestamps: true
})
RestaurantsSchema.plugin(mongoosePaginate)
RestaurantsSchema.index({ location: "2dsphere"})
const Restaurants = mongoose.model('Restaurants', RestaurantsSchema)
module.exports = Restaurants