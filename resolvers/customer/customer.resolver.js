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
    async verifyCustomerToken(root, args, context) {
      let result = await CustomerController.verifyCustomerToken(root, args, context)
      return result
    },
    async getAllCustomerLocations(root, args, context) {
      let result = await CustomerController.getAllCustomerLocations(root, args, context)
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

      async addCustomerLocation(root, args, context) {
        let result = await CustomerController.addCustomerLocation(root, args, context)
        return result
      },

      async deleteCustomerLocation(root, args, context) {
        let result = await CustomerController.deleteCustomerLocation(root, args, context)
        return result
      },
      async updateCustomerProfilePicture(root, args, context) {
        let result = await CustomerController.updateCustomerProfilePicture(root, args, context)
        return result
      },
  },
}

module.exports = resolvers