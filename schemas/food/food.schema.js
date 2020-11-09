const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getAllFoods: FoodCategoryOutPut
    getAllFoodsByRestaurant: FoodCategoryOutPutOne
    getAllFoodsByAdmin(owner_id: ID): FoodCategoryOutPut
    getOneFood(foodParams: FoodParams): foodAddOutPut
  }

  type Mutation {
    addFood(foodInput: FoodInput): foodAddOutPut
    updateFood(foodInput: FoodInput): FoodEditDeleteOutPut
    deleteFood(foodParams: FoodParams): FoodEditDeleteOutPut

    updateFoodStatus(status: Boolean, cat_id:ID, food_id: ID): FoodEditDeleteOutPut
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

type FoodCategoryOutPut {
  error: Boolean
  msg: String
  data: [FoodCategoryWithId]
}

type FoodCategoryOutPutOne {
  error: Boolean
  msg: String
  data: FoodCategoryWithId
}

type FoodCategoryWithId {
  _id: ID
  name: String
  food_categories: [FoodCategory]
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