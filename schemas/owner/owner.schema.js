const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  ownerAdded: ownerData
}

type Query {
    getAllOwners: OwnersOutPut
  }

  type Mutation {
    addOwner(OwnerData): AddOutPut
    updateOwner(OwnerData): AddOutPut
    deleteOwner(_id: ID): DeleteOutPut
  }

  type AddOutPut {
      error: Boolean
      msg: String
      data: OwnerData
  }

  type DeleteOutPut {
    error: Boolean
    msg: String
}

type OwnersOutPut {
    error: Boolean
    msg: String
    data: [OwnerData]
}

  type OwnerData {
    _id: ID
    first_name: String
    last_name: String,
    mobile: String,
    email: String,
    status: String,
    type: String,
    address
  }
`
module.exports = typeDefs