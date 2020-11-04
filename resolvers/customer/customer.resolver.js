const CustomerController = require('../../controllers/customer/customer.controller')

const resolvers = {

  Query: {
    async getAllCustomers(root, args, context) {
      let results = await CustomerController.getAllCustomers(root, args, context)
      return results
    },
    async getOneCustomer(root, args, context) {
      let result = await CustomerController.getOneCustomer(root, args, context)
      return result
    },
    async customerLogin(root, args, context) {
      let result = await CustomerController.customerLogin(root, args, context)
      return result
    },
  },
  Mutation: {
    async addCustomer(root, args, context) {
      let result = await CustomerController.addCustomer(root, args, context)
      return result
    },
    
    async updateCustomer(root, args, context) {
      let result = await CustomerController.updateCustomer(root, args, context)
      return result
    },

    async deleteCustomer(root, args, context) {
        let result = await CustomerController.deleteCustomer(root, args, context)
        return result
      },

      async updateCustomerLocation(root, args, context) {
        let result = await CustomerController.updateCustomerLocation(root, args, context)
        return result
      },
  },
}

module.exports = resolvers