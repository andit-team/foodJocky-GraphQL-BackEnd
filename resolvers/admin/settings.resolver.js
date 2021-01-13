const SettingsController = require('../../controllers/admin/settings.controller')

const resolvers = {
  Mutation: {
    async addDeliveryCharge(root, args, context) {
      let result = await SettingsController.addDeliveryCharge(root, args, context)
      return result
    }
  },
}

module.exports = resolvers