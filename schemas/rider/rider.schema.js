const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getAllRiders: RidersOutput
    getOneRider(_id: ID): RiderAddOutPut
    riderLogin(mobile: String , password: String): RiderAddOutPut
    verifyRiderToken(token: String): RiderAddOutPut
  }

  type Mutation {
    addRider(riderInput: RiderInput): RiderAddOutPut
    updateRider(riderInput: RiderInput): RiderEditDeleteOutput
    deleteRider(_id: ID): RiderEditDeleteOutput
    updateRiderWithStatus(riderInput: RiderInput): RiderEditDeleteOutput
  }

  type RiderAddOutPut {
      token: String
      error: Boolean
      msg: String
      data: RiderData
  }

  type RiderEditDeleteOutput {
    error: Boolean
    msg: String
}

type RidersOutput {
    error: Boolean
    msg: String
    data: [RiderData]
}

input RiderInput {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
    type: String
    national_id: String
    status: String
    rejection_msg: String
    vehicle_type: String
    vehicle_type_img: String
    present_address: String
    permanent_address: String
}

  type RiderData {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    email: String
    type: String
    national_id: String
    status: String
    rejection_msg: String
    vehicle_type: String
    vehicle_type_img: String
    present_address: String
    permanent_address: String
    last_location: LocationType
  }
`
module.exports = typeDefs