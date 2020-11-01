const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  restaurantAdded: RestaurantAddOutPut
}

type Query {
    getAllRestaurantsByOwner(status: String): RestaurantsOutPut
    getAllRestaurantsByAdmin(owner_id: ID, status: String): RestaurantsOutPut
    getOneRestaurant(_id: ID): RestaurantAddOutPut
    restaurantLogin(user: String, password: String): RestaurantAddOutPut
}

type Mutation {
    addRestaurant(restaurantInput: RestaurantInput): RestaurantAddOutPut
    updateRestaurant(restaurantInput: RestaurantInput): RestaurantEditDeleteOutPut
    deleteRestaurant(_id: ID): RestaurantEditDeleteOutPut
    updateRestaurantStatus(_id: ID): RestaurantEditDeleteOutPut
}

type RestaurantAddOutPut {
      token: String
      error: Boolean
      msg: String
      data: RestaurantData
}

type RestaurantEditDeleteOutPut {
    error: Boolean
    msg: String
}

type RestaurantsOutPut {
    error: Boolean
    msg: String
    data: [RestaurantData]
}

input RestaurantInput {
    _id: ID
    user: String
    password: String
    name: String
    restaurant_or_homemade: String
    owner: ID
    plan: ID
    tags: [String]
    description: String
    cover_img: String
    thumb_img: String
    address: Address
    food_categories: [InputFoodCategories]
    price_type: String
}

input InputFoodCategories {
  _id: ID
  name: String
}

  type RestaurantData {
    _id: ID
    user: String
    password: String
    name: String
    restaurant_or_homemade: String
    owner: Owner
    plan: Plan
    tags: [String]
    description: String
    cover_img: String
    thumb_img: String
    address: AddressType
    food_categories:[FoodCategory]
    price_type: String
  }

  type FoodCategory {
    _id: ID
    name: String
    foods: [Food]
}

type Food {
  _id: ID
  name: String
  description: String
  dish_img: String
  price: Float
  commission: Float
  price_and_size: [PriceAndSize]
}

type PriceAndSize {
  size: String
  price: Float
}

  type Owner {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
    type: String
    owner_address: String
}

type Plan {
    _id: ID
    title: String
    price: Int
    commision: Int
    duration: String
    feature: Boolean
  }

input Address {
      address: String
      location: Location
  }

input Location {
  lat: String
  lng: String
}

type AddressType {
  address: String
  location: LocationType
}

type LocationType {
  lat: Float
  lng: Float
}

`
module.exports = typeDefs