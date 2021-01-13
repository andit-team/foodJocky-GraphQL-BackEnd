const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
    orderAdded: OrderAddOutPut
    orderAddedSeeByRestaurant(token: String!): OrderAddOutPut
    orderAddedSeeByAgent(token: String!): OrderAddOutPut

    orderUpdated(token: String!): OrderAddOutPut
}

type Query {
    getAllOrdersByRestaurant(status: String): OrdersOutput
    getAllOrdersByAgent(status: String): OrdersOutput
    getAllOrdersByAdmin(status: String): OrdersOutput
    getAllOrdersByCustomer(status: String): OrdersOutput

    getReportByAdmin(start_date: String, end_date: String, restaurat_id: ID): ReportsOutput

    getOneOrder(_id: ID): OrderAddOutPut
}

type Mutation {
    addOrder(orderInput: OrderInput): OrderAddOutPut

    updateOrderStatus(_id: ID, status: String, delivery_time: String, pin: String): OrderAddOutPut
    
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

type ReportsOutput {
    error: Boolean
    msg: String
    data: ReportData
}

type ReportData {
    orders: [OrderData]
    total: Int
}

input OrderInput {
    _id: ID
    items: [ItemInput]
    total: Float
    restaurant: ID
    delivery_info: CustomerAddress
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
    delivery_info: CustomerAddressType
    delivery_time: String
    pin: String
    createdAt: String
    updatedAt: String
}
`
module.exports = typeDefs