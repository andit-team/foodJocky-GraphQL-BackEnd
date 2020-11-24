const { PubSub, withFilter} = require('apollo-server')
const pubsub = new PubSub()

const OrderController = require('../../controllers/order/order.controller')

const ORDER_ADDED = "ORDER_ADDED"
const ORDER_ADDED_SEEN_BY_RESTAURANT = "ORDER_ADDED_SEEN_BY_RESTAURANT"
const ORDER_ADDED_SEEN_BY_AGENT = "ORDER_ADDED_SEEN_BY_AGENT"

const resolvers = {
  Subscription: {
    orderAdded: {
      subscribe: () => pubsub.asyncIterator(ORDER_ADDED),
    },

    orderAddedSeeByRestaurant: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_ADDED_SEEN_BY_RESTAURANT),
        (payload, variables) => {
          const token = variables.token
          const decodedToken = jwt.verify(
              token,
              process.env.SECRET
          )
          return payload.restaurant_id == decodedToken._id
        }
      )
    },

    orderAddedSeeByAgent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_ADDED_SEEN_BY_AGENT),
        (payload, variables) => {
          const token = variables.token
          const decodedToken = jwt.verify(
              token,
              process.env.SECRET
          )
          return payload.agent_id == decodedToken._id
        }
      )
    }
  },
  Query: {
  },
  Mutation: {
    async addOrder(root, args, context) {
      let result = await OrderController.addOrder(root, args, context)
      pubsub.publish(ORDER_ADDED, { orderAdded: result })
      return result
    }
  },
}

module.exports = resolvers
