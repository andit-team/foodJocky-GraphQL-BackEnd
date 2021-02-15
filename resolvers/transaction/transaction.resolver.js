const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const TransactionController = require('../../controllers/transaction/transaction.controller')

const resolvers = {
  Query: {
    async getAllTransactionsByAdmin(root, args, context) {
       let results = await TransactionController.getAllTransactionsByAdmin(root, args, context)
       return results
    },

  },
  Mutation: {
    async updateTransactionByAdmin(root, args, context) {
      let result = await TransactionController.updateTransactionByAdmin(root, args, context)
      return result
    },
  },
}

module.exports = resolvers