const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getAllCustomers: CustomersOutPut
    getOneCustomer: customerAddOutPut
    customerLogin(mobile: String, password: String): customerAddOutPut
    verifyCustomerToken(token: String): customerAddOutPut
    getAllCustomerLocations: AllCustomerLocationData
    getCustomerDashboardData: CustomerDashboardData
    getDistanceFromLatLng(customer_lat: Float, customer_lng: Float, restaurant_lat: Float, restaurant_lng: Float): DistanceOutputData

    getHomePageData: SendHomePageData
  }

  type Mutation {
    addCustomer(customerInput: CustomerInput): customerAddOutPut
    updateCustomer(customerInput: CustomerInput): CustomerEditDeleteOutPut
    deleteCustomer(_id: ID): CustomerEditDeleteOutPut
    addCustomerLocation(customerAddress: CustomerAddress): CustomerAddLocationData
    deleteCustomerLocation(_id: ID): CustomerEditDeleteOutPut
    updateCustomerProfilePicture(profile_picture: String): CustomerEditDeleteOutPut
  }

  type SendHomePageData {
    error: Boolean
    msg: String
    data: HomePageData
  }

  type HomePageData {
    populat_category: [PopularCategoryData]
  }

  type PopularCategoryData {
    _id: ID
    image_url: String
    name: String
    restaurant_count: Int
  }

  input CustomerAddress {
    _id: ID
    title: String
    address: Address
    reciver_mobile_no: String
    reciver_name: String
    house_no: String
    floor_no: String
    note_to_rider: String
  }

  type CustomerAddLocationData {
    error: Boolean
    msg: String
    data: CustomerAddressType
  }

  type DistanceOutputData {
    error: Boolean
    msg: String
    data: DistanceData
  }

  type DistanceData {
    distance: Int
  }

  type CustomerDashboardData {
    error: Boolean
    msg: String
    data: CustomerDashboard
  }

  type CustomerDashboard {
    totalOrders: Int
    pendingOrders: Int
  }

  type AllCustomerLocationData {
    error: Boolean
    msg: String
    data: [CustomerAddressType]
  }

  type CustomerAddressType {
    _id: ID
    title: String
    address: AddressType
    reciver_mobile_no: String
    reciver_name: String
    house_no: String
    floor_no: String
    note_to_rider: String
    status: Int
  }

  input CustomerInput {
      _id: ID
      mobile: String
      email: String
      password: String
      first_name: String
      last_name: String
  }

  type CustomerData {
    _id: ID
    mobile: String
    email: String
    password: String
    first_name: String
    last_name: String
    customer_addresses: [CustomerAddressType]
    type: String
    last_order: OrderData
    profile_picture: String
    balance: Float
    cashback: Float
}

  type customerAddOutPut {
      token: String
      error: Boolean
      msg: String
      data: CustomerData
  }

  type CustomerEditDeleteOutPut {
    error: Boolean
    msg: String
}

type CustomersOutPut {
    error: Boolean
    msg: String
    data: [CustomerData]
}


`
module.exports = typeDefs