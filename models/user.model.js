const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const userSchema = new Schema({
  mobile:{
    type: String,
    unique: true
  },
  email:{
      type: String,
  },
  password:{
      type: String,
  },
  first_name:{
    type: String,
  },
  last_name:{
      type: String,
  },
  profile_picture: {
    type: String
  },
  type: {
    type: String, // owner, rider, customer, agent, admin
    required: true
  },
  location: {
    type: { type: String },
    coordinates: []
  },
  customer_addresses: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    title: {
      type: String
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
    reciver_mobile_no: {
      type: String
    },
    reciver_name: {
      type: String
    },
    house_no: {
      type: String
    },
    floor_no: {
      type: String
    },
    note_to_rider: {
      type: String
    },
    status: {
      type: Number
    }
  }],
  last_order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orders',
  },
  // For Restaurant Owners ---------------------------
  owner_address: {
    type: String
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurants',
  }],
  voucher:[{
    code: {
      type: String
    },  
    discount: {
      type: Number
    },
    minimum_order: {
      type: Number
    },
    start_date:{
      type: Date
    },
    end_date:{
      type: Date
    },
    status:{
      type: Boolean
    },
    restaurants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurants',
    }
  }],
  // For Riders-----------------------------------------
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  national_id: {
      type: String
  },
  rejection_msg:{
    type: String
  },
  division: {
      type: String
  },
  district: {
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
  status: {
      type: String
  },
  equipment: {
      type: String
  },
  bag_type: {
      type: String
  },

// Not for First Relesase ----------------------

//   available_shifts: [
//       {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Shifts',
//       }
//   ],
  earned_amount: {
      type: Number
  },
  want_to_deliver_remote: {
      type: Boolean
  },

  // For Agent----------------------------------------
  trade_license_no: {
    type: String
  },
  agent_level: {
    type: String
  },

  // For Agency----------------------------
  business_name: {
    type: String
  },
  business_location: {
    type: String
  },
  trade_license_img: {
    type: String
  },
  agency_level: {
    type: String
  },
  agency_areas: [
    {
      type: String
    }
  ],

  // For Rider------------------------
  vehicle_type: {
    type: String
  },
  vehicle_type_img: {
    type: String
  },
  present_address: {
    type: String
  },
  permanent_address: {
    type: String
  },
  last_location: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },

  // For Wallet ------------------------------
  balance: {
    type: Number
  },
  cashback: {
    type: Number
  },

  // For Rating Review-------------------------
  place_rating: {
    status: Boolean,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurants'
    }
  }
},
{
    timestamps: true
})
userSchema.plugin(mongoosePaginate)
userSchema.index({ location: "2dsphere"})
const User = mongoose.model('Users', userSchema)
module.exports = User