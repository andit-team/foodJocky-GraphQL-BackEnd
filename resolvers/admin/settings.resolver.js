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
    },
    async addCustomerCashbackPercentange(root, args, context) {
      let result = await SettingsController.addCustomerCashbackPercentange(root, args, context)
      return result
    },
    async addGoogleMapApiKey(root, args, context) {
      let result = await SettingsController.addGoogleMapApiKey(root, args, context)
      return result
    },
    async addRiderAndRestaurantExtraTime(root, args, context) {
      let result = await SettingsController.addRiderAndRestaurantExtraTime(root, args, context)
      return result
    },
    async addSSLCommerezInformation(root, args, context) {
      let result = await SettingsController.addSSLCommerezInformation(root, args, context)
      return result
    },
    async addCustomerVat(root, args, context) {
      let result = await SettingsController.addCustomerVat(root, args, context)
      return result
    },
  },
}

module.exports = resolvers