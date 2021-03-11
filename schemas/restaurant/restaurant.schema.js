const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  restaurantAdded: RestaurantAddOutPut
  restaurantAddedSeeByAgent(token: String!): RestaurantAddOutPut
}

type Query {
  getAllRestaurantsByOwner(status: String): RestaurantsOutPut
  getAllRestaurantsByAdmin(owner_id: ID, status: String, page: Int, pagesize: Int): PaginatedRestaurantsOutput
  getAllRestaurantsByAgent(areaInput: AreaInput): RestaurantsOutPut
  getOneRestaurant(_id: ID): RestaurantAddOutPut
  restaurantLogin(user: String, password: String): RestaurantAddOutPut

  SearchRestaurants(longitude: Float, latitude: Float, name: String, restaurant_or_homemade: String, filter: Boolean, category: [ID], price_type: String): SearchRestaurantsOutPut
  verifyRestaurantToken(token: String): RestaurantAddOutPut

  getAllRestaurantsByCategory(category_id: ID): RestaurantsOutPut
  getTopRestaurants: RestaurantsOutPut

}

input AreaInput {
  status: String
  division: String
  district: String
  municipal: String
  ward: String
  upazila: String
  union: String
  village: String
}

type Mutation {
  addRestaurant(restaurantInput: RestaurantInput): RestaurantAddOutPut
  updateRestaurant(restaurantInput: RestaurantInput): RestaurantEditDeleteOutPut
  deleteRestaurant(_id: ID): RestaurantEditDeleteOutPut
  updateRestaurantStatus(restaurantInput: RestaurantInput): RestaurantEditDeleteOutPut

  updateRestaurantActivityByOwner(status: Boolean, rest_id: ID ): RestaurantEditDeleteOutPut
  updateRestaurantActivityBySelf(status: Boolean): RestaurantEditDeleteOutPut

  transferBalanceFromRestaurant(restaurant_id: ID, amount: Float): RestaurantEditDeleteOutPut
  transferBalanceFromAllRestaurant: RestaurantEditDeleteOutPut

  rateRestaurant(rateInput: RestaurantRatingInput): RestaurantEditDeleteOutPut
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

type SearchRestaurantsOutPut {
  error: Boolean
  msg: String
  data: SearchRestaurantsData
}

type SearchRestaurantsData {
  newRestaurants: [RestaurantData],
  nearestRestaurants: [RestaurantData],
  topRestaurants: [RestaurantData],
  allRestaurants: [RestaurantData]
}

type RestaurantsOutPut {
  error: Boolean
  msg: String
  data: [RestaurantData]
}

type PaginatedRestaurantsOutput {
  error: Boolean
  msg: String
  data: RestaurantPaginationData
}

type RestaurantPaginationData {
  docs: [RestaurantData]
  totalDocs: Int
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
  status: String
  active: Boolean
  rejection_msg: String
  residential_or_municipal: String
  division: String
  district: String
  municipal: String
  ward: String
  upazila: String
  union: String
  village: String
  discount_given_by_restaurant: Int
  discount_given_by_admin: Int
  balance: Float
  vat: Boolean
  rider_cost: Boolean
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
  owner: OwnerData
  plan: PlanData
  tags: [String]
  description: String
  cover_img: String
  thumb_img: String
  address: AddressType
  food_categories:[FoodCategory]
  foods_count: Int
  price_type: String
  status: String
  active: Boolean
  rejection_msg: String
  discount_given_by_restaurant: Int
  discount_given_by_admin: Int
  balance: Float
  vat: Boolean
  rider_cost: Boolean
  createdAt: String
  updatedAt: String
  ratings: [RestaurantRatingData]
  rating: Float
  rating_count: Int
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
  active: Boolean
  price_and_size: [PriceAndSize]
}

type PriceAndSize {
  size: String
  price: Float
}

input Address {
  address: String
  location: Location
}

input Location {
  lat: Float
  lng: Float
}

type AddressType {
  address: String
  location: LocationType
}

type LocationType {
  lat: Float
  lng: Float
}

type RestaurantRatingData {
  rate: Int
  comment: String
  user: CustomerData
  date: String
}

input RestaurantRatingInput {
  cancel: Boolean
  rate: Int
  comment: String
  restaurant_id: ID
}

`
module.exports = typeDefs