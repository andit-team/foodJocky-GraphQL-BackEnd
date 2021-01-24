const mongoose = require('mongoose')
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
  agency_level: {
    type: String
  },
  agency_areas: [
    {
      type: String
    }
  ],
},
{
    timestamps: true
})

userSchema.index({ location: "2dsphere"})
const User = mongoose.model('Users', userSchema)
module.exports = User