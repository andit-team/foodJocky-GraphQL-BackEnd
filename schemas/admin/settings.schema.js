const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    getSettings: settingsOutPut
  }
  type Mutation {
    addDeliveryCharge(amount: Int): settingsOutPut
    addCustomerCashbackPercentange(customer_cashback_percentange: Int): settingsOutPut
    addGoogleMapApiKey(google_map_api_key: String): settingsOutPut
    addRiderAndRestaurantExtraTime(rider_extra_time: Int, restaurant_extra_time: Int): settingsOutPut
    addSSLCommerezInformation(sslInput: SSLInput): settingsOutPut
    addVat(customer_vat: Int,restaurant_vat: Int): settingsOutPut
    addRiderCost(rider_cost: Int): settingsOutPut
    addSMSApiInformation(sms_api_url: String, sms_api_username: String, sms_api_password: String): settingsOutPut
  }

  input SSLInput {
    ssl_commerez_store_id: String
    ssl_commerez_store_password: String
    ssl_commerez_currency: String
    ssl_commerez_cus_city: String
    ssl_commerez_cus_country: String
  }

  type settingsOutPut {
      error: Boolean
      msg: String
      data: SettingsData
  }

  type SettingsData {
    _id: ID
    delivery_charge: Int
    customer_cashback_percentange: Int
    google_map_api_key: String
    rider_extra_time: Int
    restaurant_extra_time: Int
    ssl_commerez_store_id: String
    ssl_commerez_store_password: String
    ssl_commerez_currency: String
    ssl_commerez_cus_city: String
    ssl_commerez_cus_country: String
    customer_vat: Int
    restaurant_vat: Int
    rider_cost: Int
    sms_api_url: String
    sms_api_username: String
    sms_api_password: String
  }
`
module.exports = typeDefs