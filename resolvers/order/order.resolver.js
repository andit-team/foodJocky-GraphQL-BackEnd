const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const OrderController = require('../../controllers/order/order.controller')

const ORDER_ADDED = "ORDER_ADDED"

const resolvers = {
  Subscription: {
    orderAdded: {
      subscribe: () => pubsub.asyncIterator(ORDER_ADDED),
    }
  },
  Query: {
  },
  Mutation: {
    async addOrder(root, args, context) {
      let result = await OrderController.addRider(root, args, context)
      pubsub.publish(ORDER_ADDED, { orderAdded: result })
      return result
    }
  },
}

module.exports = resolvers
