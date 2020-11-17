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
  addresses: [{
      address: {
        type: String
    },
    location: {
        lat: String,
        lng: String
    }
  }],
//   orders: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Orders',
//   }],
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
  national_id: {
      type: String
  },
  rejection_msg:{
    type: String
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
  }
},
{
    timestamps: true
})

userSchema.index({ location: "2dsphere"})
const User = mongoose.model('Users', userSchema)
module.exports = User