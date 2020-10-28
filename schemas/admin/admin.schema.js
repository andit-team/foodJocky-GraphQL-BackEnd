const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    adminLogin(mobile: String , password: String): adminOutPut
  }

  type Mutation {
    addAdmin(mobile: String , password: String, type: String): adminOutPut
  }

  type adminOutPut {
      token: String
      error: Boolean
      msg: String
      data: AdminData
  }

  type AdminData {
    _id: ID
    mobile: String
    type: String
  }
`
module.exports = typeDefs