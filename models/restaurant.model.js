const mongoose = require('mongoose')
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
    // offer:{
    //     type: mongoose.Schema.Types.ObjectId,          // 20% Off + GOROM60
    //     ref: 'offers',
    // },
    // voucher: {
    //     type: mongoose.Schema.Types.ObjectId,          // Vouchers up to Tk 100 off
    //     ref: 'vouchers',
    // },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'divisions',
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'districts',
    },
    municipal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Municipals',
    },
    word: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Words',
    },
    upazila: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upazilas',
    },
    union: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unions',
    },
    village: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Villages',
    },
    // orders: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'orders',
    // }],
    // earned_amount: {
    //     type: Number
    // },
    // agent_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'agents',
    // }
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
    
},
{
    timestamps: true
})

RestaurantsSchema.index({ location: "2dsphere"})

const Restaurants = mongoose.model('Restaurants', RestaurantsSchema)
module.exports = Restaurants