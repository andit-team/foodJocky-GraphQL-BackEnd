const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    getAllCategories: CategoriesOutPut
  }

  type Mutation {
    addCategory(name: String, image_url: String): AddOutPut
    updateCategory(_id: ID, name: String, image_url: String): DeleteOutPut
  }

  type AddOutPut {
      error: Boolean
      msg: String
      data: CategoryData
  }

  type DeleteOutPut {
    error: Boolean
    msg: String
}

type CategoriesOutPut {
    error: Boolean
    msg: String
    data: [CategoryData]
}

  type CategoryData {
    _id: ID
    name: String
    image_url: String
  }
`
module.exports = typeDefs