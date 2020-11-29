const { PubSub, withFilter} = require('apollo-server')
const pubsub = new PubSub()
const jwt = require("jsonwebtoken")

const OrderController = require('../../controllers/order/order.controller')

const ORDER_ADDED = "ORDER_ADDED"
const ORDER_ADDED_SEEN_BY_RESTAURANT = "ORDER_ADDED_SEEN_BY_RESTAURANT"
const ORDER_ADDED_SEEN_BY_AGENT = "ORDER_ADDED_SEEN_BY_AGENT"
const ORDER_UPDATED = "ORDER_UPDATED"

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
    },

    orderUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_UPDATED),
        (payload, variables) => {
          const token = variables.token
          const decodedToken = jwt.verify(
              token,
              process.env.SECRET
          )
          return payload.customer_id == decodedToken._id
        }
      )
    }
  },
  Query: {
    async getAllOrdersByRestaurant(root, args, context) {
       let results = await OrderController.getAllOrdersByRestaurant(root, args, context)
       return results
    },

    async getAllOrdersByAgent(root, args, context) {
      let results = await OrderController.getAllOrdersByAgent(root, args, context)
      return results
   },

   async getAllOrdersByAdmin(root, args, context) {
    let results = await OrderController.getAllOrdersByAdmin(root, args, context)
    return results
 },

 async getAllOrdersByCustomer(root, args, context) {
  let results = await OrderController.getAllOrdersByCustomer(root, args, context)
  return results
},

async getOneOrder(root, args, context) {
  let result = await OrderController.getOneOrder(root, args, context)
  return result
},

  },
  Mutation: {
    async addOrder(root, args, context) {
      let result = await OrderController.addOrder(root, args, context)
      pubsub.publish(ORDER_ADDED, { orderAdded: result })
      let agent_id = result.data.agent._id
      pubsub.publish(ORDER_ADDED_SEEN_BY_AGENT, { orderAddedSeeByAgent: result, agent_id })
      let restaurant_id = result.data.restaurant._id
      pubsub.publish(ORDER_ADDED_SEEN_BY_RESTAURANT, { orderAddedSeeByRestaurant: result, restaurant_id })
      return result
    },

    async updateOrderStatus(root, args, context) {
      let result = await OrderController.updateOrderStatus(root, args, context)
      let customer_id = result.data.customer._id
      pubsub.publish(ORDER_UPDATED, { orderUpdated: result, customer_id })
      return result
    }
  },
}

module.exports = resolvers