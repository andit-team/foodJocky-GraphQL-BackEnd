const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  restaurantAdded: RestaurantAddOutPut
}

type Query {
    getAllRestaurantsByOwner: RestaurantsOutPut
    getAllRestaurantsByAdmin(owner_id: ID): RestaurantsOutPut
    getOneRestaurant(_id: ID): RestaurantData
  }

  type Mutation {
    addRestaurant(restaurantInput: RestaurantInput): RestaurantAddOutPut
    updateRestaurant(restaurantInput: RestaurantInput): RestaurantEditDeleteOutPut
    deleteRestaurant(_id: ID): RestaurantEditDeleteOutPut
    updateRestaurantStatus(_id: ID): RestaurantEditDeleteOutPut
  }

  type RestaurantAddOutPut {
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
    food_categories: [
        {
            _id: ID
            name: String
        }
    ]
    price_type: String
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
    address: Address
    food_categories:[
        {
            _id: ID
            name: String
            foods: [
                {
                    _id: ID
                    name: String
                    description: String
                    dish_img: String
                    price: Float
                    commission: Float
                    pirce_and_size: [
                        {
                            size: String
                            price: Float
                        }
                    ]
                }
            ]
        }
    ]
    price_type: String
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

  type Address {
      address: String
      location: {
        lat: String
        lng: String
      }
  }
`
module.exports = typeDefs