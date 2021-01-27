const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
    orderAdded: OrderAddOutPut
    orderAddedSeeByRestaurant(token: String!): OrderAddOutPut
    orderAddedSeeByAgent(token: String!): OrderAddOutPut
    orderGetByAgency(token: String!): OrderAddOutPut
    orderGetByRider(token: String!): OrderAddOutPut

    orderUpdated(token: String!): OrderAddOutPut
}

type Query {
    getAllOrdersByRestaurant(status: String): OrdersOutput
    getAllOrdersByAgent(status: String): OrdersOutput
    getAllOrdersByAdmin(status: String): OrdersOutput
    getAllOrdersByCustomer(status: String): OrdersOutput
    getAllOrdersByAgency(status: String): OrdersOutput
    getAllAcceptedOrdersByAgency: OrdersOutput
    getAllOrdersByRider(status: String): OrdersOutput

    getReportByAdmin(start_date: String, end_date: String, restaurant_id: ID): ReportsOutput

    getOneOrder(_id: ID): OrderAddOutPut
}

type Mutation {
    addOrder(orderInput: OrderInput): OrderAddOutPut

    updateOrderStatus(_id: ID, status: String): OrderAddOutPut
    updateOrderByAgency(agency_status: String, _id: ID, rider: ID): OrderAddOutPut

    checkOrderRelatedApi(agency_status: String, _id: ID): OrderApiCheck
    
}

type OrderApiCheck {
    error: Boolean
    msg: String
    data: OrderApiData
}

type OrderApiData {
    check: String
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
    restaurant: RestaurantData
    orders: [OrderData]
    total: Int
}

input OrderInput {
    _id: ID
    items: [ItemInput]
    total: Float
    sub_total: Float
    delivery_charge: Int
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
    sub_total: Float
    delivery_charge: Int
    status: String
    restaurant: RestaurantData
    customer: CustomerData
    agent: AgentData
    rider: RiderData
    delivery_info: CustomerAddressType
    delivery_time: String
    pin: String
    createdAt: String
    updatedAt: String
}
`
module.exports = typeDefs