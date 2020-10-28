const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  ownerAdded: ownerAddOutPut
}

type Query {
    getAllOwners(type: String): OwnersOutPut
    getOneOwner(_id: ID): ownerAddOutPut
    ownerLogin(mobile: String , password: String): ownerAddOutPut
  }

  type Mutation {
    addOwner(ownerInput: OwnerInput): ownerAddOutPut
    updateOwner(ownerInput: OwnerInput): OwnerEditDeleteOutPut
    deleteOwner(_id: ID): OwnerEditDeleteOutPut
    updateOwnerStatus(status: String, _id: ID): OwnerEditDeleteOutPut
  }

  type ownerAddOutPut {
      token: String
      error: Boolean
      msg: String
      data: OwnerData
  }

  type OwnerEditDeleteOutPut {
    error: Boolean
    msg: String
}

type OwnersOutPut {
    error: Boolean
    msg: String
    data: [OwnerData]
}

input OwnerInput {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
    type: String
    owner_address: String
}

  type OwnerData {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    email: String
    type: String
    owner_address: String
  }
`
module.exports = typeDefs