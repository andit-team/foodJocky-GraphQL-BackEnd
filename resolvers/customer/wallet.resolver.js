const WalletController = require('../../controllers/customer/wallet.controller')

const resolvers = {

  Query: {
    async getWalletPageData(root, args, context) {
      let results = await WalletController.getWalletPageData(root, args, context)
      return results
    },
  },
  Mutation: {
    async addBalance(root, args, context) {
      let result = await WalletController.addBalance(root, args, context)
      return result
    },
  },
}

module.exports = resolvers