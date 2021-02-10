const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrdersSchema = new Schema({
    items: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            category_id: mongoose.Schema.Types.ObjectId,
            name: String,
            size: String,
            quantity: Number,
            price: Number,
            base_price: Number
        }
    ],
    base_price_total: {
      type: Number
    },
    total: {
        type: Number
    },
    base_price_sub_total: {
      type: Number
    },
    sub_total: {
      type: Number
    },
    customer_discount_amount: {
      type: Number
    },
    discount_given_by_restaurant: {
      type: Number
    },
    discount_given_by_admin: {
      type: Number
    },
    delivery_charge: {
        type: Number
    },
    vat: {
      type: Number
    },
    payment_type: {
      type: String        //cod,wallet
    },
    status: {
        type: String    // pending,accepted,delivered,paid,cancelled
    },
    cashback: {
      type: Number
    },
    cashback_percentange: {
      type: Number
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    rej_reason: {
        type: String
    },
    agencies: [
      {
         _id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Users',
         },
         status: {
           type: Boolean
         }
      }
    ],
    rider: {
        type: mongoose.Schema.Types.ObjectId,               //Rider will be assigned later
        ref: 'Users',
    },
    order_type: {
        type: String
    },
    pack_price: {
        type: Number
    },
    voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vouchers',
    },
    offer: {
        type: Number
    },
    quality:{
        type: String
    },
    division: {
        type: String,
    },
    district: {
      type: String,
    },
    municipal: {
      type: String,
    },
    ward: {
      type: String,
    },
    upazila: {
      type: String,
    },
    union: {
      type: String,
    },
    village: {
      type: String,
    },
    delivery_time: {
      type: String
    },
    delivery_info: {
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
        }
    },
    residential_or_municipal: {
      type: String
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transactions',
  },
},
{
    timestamps: true
})

const Orders = mongoose.model('Orders', OrdersSchema)
module.exports = Orders