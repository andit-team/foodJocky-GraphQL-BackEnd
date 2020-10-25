const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  mobile:{
    type: String,
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
  location: {
    type: { type: String },
    coordinates: []
  },
  address: [{
      type: Object
  }],
//   orders: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Orders',
//   }],
  // For Restaurant Owners ---------------------------
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurants',
  }],
  // For Riders-----------------------------------------
  national_id: {
      type: String
  },
  area: {
      division: String,
      district: String,
      municipals: String,// if municipals then here end otherwise below
      upazilla: String,
      union: String,
      village: String
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
})

const User = mongoose.model('Users', userSchema)
module.exports = User