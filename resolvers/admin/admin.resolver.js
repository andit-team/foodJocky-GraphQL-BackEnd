const AdminController = require('../../controllers/admin/admin.controller')

const resolvers = {
  Query: {
    async adminLogin(root, args, context) {
       let result = await AdminController.adminLogin(root, args, context)
       return result
    },

    async verifyAdminToken(root, args, context) {
      let result = await AdminController.verifyToken(root, args, context)
      return result
   },
  },
  Mutation: {
    async addAdmin(root, args, context) {
      let result = await AdminController.addAdmin(root, args, context)
      return result
    },
  },
}

module.exports = resolvers