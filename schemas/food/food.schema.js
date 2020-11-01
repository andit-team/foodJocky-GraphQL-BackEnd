const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getAllFoods(foodParams: FoodParams): FoodsOutPut
  }

  type Mutation {
    addFood(foodInput: FoodInput): foodAddOutPut
    updateFood(foodInput: FoodInput): FoodEditDeleteOutPut
    deleteFood(foodParams: FoodParams): FoodEditDeleteOutPut
  }

  type foodAddOutPut {
      error: Boolean
      msg: String
      data: Food
  }

  type FoodEditDeleteOutPut {
    error: Boolean
    msg: String
}

type FoodsOutPut {
    error: Boolean
    msg: String
    data: [Food]
}

input FoodParams {
    _id: ID
    restaurant_id: ID
    food_categories_id: ID
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