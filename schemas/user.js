const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Subscription {
    userAdded: UserData
  }

  type userLoginData{
    token: String
  }

  type Query {
    users: [User]
    userLogin(email: String, password: String): userLoginData
  }

  type Mutation {
    addUser(email: String, password: String): UserData
  }

  type User {
    email: String
    password: String
  }

  type UserData {
    _id: ID
    email: String
    password: String
  }
`
module.exports = typeDefs