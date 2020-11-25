const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
    orderAdded: OrderAddOutPut
    orderAddedSeeByRestaurant(token: String!): OrderAddOutPut
    orderAddedSeeByAgent(token: String!): OrderAddOutPut
}

type Mutation {
    addOrder(orderInput: OrderInput): OrderAddOutPut
}

type OrderAddOutPut {
    error: Boolean
    msg: String
    data: OrderData
}

type OrderEditDeleteOutput {
    error: Boolean
    msg: String
}

type OrdersOutput {
    error: Boolean
    msg: String
    data: [OrderData]
}

input OrderInput {
    _id: ID
    items: [ItemInput]
    total: Float
    restaurant: ID
}

input ItemInput {
    _id: ID
    category_id: ID
    name: String
    size: String
    quantity: Int
    price: Float
}

type ItemOutput {
    _id: ID
    name: String
    size: String
    quantity: Int
    price: Float
}

type OrderData {
    _id: ID
    items: [ItemOutput]
    total: Float
    status: String
    restaurant: RestaurantData
    customer: CustomerData
    agent: AgentData
}
`
module.exports = typeDefs