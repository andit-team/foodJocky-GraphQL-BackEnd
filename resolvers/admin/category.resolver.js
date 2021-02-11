const CategoryController = require('../../controllers/admin/category.controller')

const resolvers = {
  Query: {
    async getAllCategories(root, args, context) {
       let results = await CategoryController.getAllCategories(root, args, context)
       return results
    },
  },
  Mutation: {
    async addCategory(root, args, context) {
      let result = await CategoryController.addCategory(root, args, context)
      return result
    },

    async updateCategory(root, args, context) {
        let result = await CategoryController.updateCategory(root, args, context)
        return result
      },
  },
}

module.exports = resolvers