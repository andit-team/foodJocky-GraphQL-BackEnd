const { gql } = require('apollo-server-express')
const typeDefs = gql`

  type Mutation {
    addGeo: GeoAddOutPut
  }

  type GeoAddOutPut {
      error: Boolean
      msg: String
  }
`
module.exports = typeDefs