const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getAllOwners(status: String): OwnersOutPut
    getOneOwner(_id: ID): ownerAddOutPut
    ownerLogin(mobile: String , password: String): ownerAddOutPut
  }

  type Mutation {
    addOwner(ownerInput: OwnerInput): ownerAddOutPut
    updateOwner(ownerInput: OwnerInput): OwnerEditDeleteOutPut
    deleteOwner(_id: ID): OwnerEditDeleteOutPut
    updateOwnerWithStatus(ownerInput: OwnerInput): OwnerEditDeleteOutPut
  }

  type ownerAddOutPut {
      error: Boolean
      msg: String
      data: Food
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

input FoodInput {
    restaurant_id: ID
    food_categories_id: ID
    _id: ID
    name: String
    description: String
    dish_img: String
    price: Float
    commission: Float
    price_and_size: [PriceAndSizeInput]
  }
  
  input PriceAndSizeInput {
    size: String
    price: Float
  }

`
module.exports = typeDefs