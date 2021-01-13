const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    getSettings: settingsOutPut
  }
  type Mutation {
    addDeliveryCharge(amount: Int): settingsOutPut
  }

  type settingsOutPut {
      error: Boolean
      msg: String
      data: SettingsData
  }

  type SettingsData {
    _id: ID
    delivery_charge: Int
  }
`
module.exports = typeDefs