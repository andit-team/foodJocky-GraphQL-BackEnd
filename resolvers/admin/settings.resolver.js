const SettingsController = require('../../controllers/admin/settings.controller')

const resolvers = {
  Query: {
    async getSettings(root, args, context) {
        let result = await SettingsController.getSettings(root, args, context)
        return result
    },
  },
  Mutation: {
    async addDeliveryCharge(root, args, context) {
      let result = await SettingsController.addDeliveryCharge(root, args, context)
      return result
    }
  },
}

module.exports = resolvers