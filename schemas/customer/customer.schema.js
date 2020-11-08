const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getAllCustomers: CustomersOutPut
    getOneCustomer: customerAddOutPut
    customerLogin(mobile: String, password: String): customerAddOutPut
    verifyCustomerToken(token: String): customerAddOutPut
  }

  type Mutation {
    addCustomer(customerInput: CustomerInput): customerAddOutPut
    updateCustomer(customerInput: CustomerInput): CustomerEditDeleteOutPut
    deleteCustomer(_id: ID): CustomerEditDeleteOutPut
    updateCustomerLocation(address: Address): CustomerEditDeleteOutPut
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
    address: AddressType
    type: String
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