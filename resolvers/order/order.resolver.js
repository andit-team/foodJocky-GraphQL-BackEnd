const { PubSub, withFilter} = require('apollo-server')
const pubsub = new PubSub()
const jwt = require("jsonwebtoken")

const OrderController = require('../../controllers/order/order.controller')

const ORDER_ADDED = "ORDER_ADDED"
const ORDER_ADDED_SEEN_BY_RESTAURANT = "ORDER_ADDED_SEEN_BY_RESTAURANT"
const ORDER_ADDED_SEEN_BY_AGENT = "ORDER_ADDED_SEEN_BY_AGENT"
const ORDER_UPDATED = "ORDER_UPDATED"
const ORDER_GET_BY_AGENCY = "ORDER_GET_BY_AGENCY"
const ORDER_GET_BY_RIDER = "ORDER_GET_BY_RIDER"
const RIDER_LOCATION_PUSHED = "RIDER_LOCATION_PUSHED"

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
          return payload.customer_id == decodedToken._id || payload.restaurant_id == decodedToken._id
        }
      )
    },

    orderGetByAgency: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_GET_BY_AGENCY),
        (payload, variables) => {
          const token = variables.token
          const decodedToken = jwt.verify(
              token,
              process.env.SECRET
          )
          let returnBoolean = false
          
          for(let i=0; i< payload.agencies.length; i++){
            if(payload.agencies[i]._id == decodedToken._id){
              returnBoolean = true
            }
          }
          return returnBoolean
        }
      )
    },
    orderGetByRider: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_GET_BY_RIDER),
        (payload, variables) => {
          const token = variables.token
          const decodedToken = jwt.verify(
              token,
              process.env.SECRET
          )
          return payload.rider_id == decodedToken._id
        }
      )
    },

    riderLocationPushed: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(RIDER_LOCATION_PUSHED),
        (payload, variables) => {
          const token = variables.token
          const decodedToken = jwt.verify(
              token,
              process.env.SECRET
          )
          return payload.agency == decodedToken._id
        }
      )
    },
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
 async getAllOrdersByAgency(root, args, context) {
  let results = await OrderController.getAllOrdersByAgency(root, args, context)
  return results
},
async getAllAcceptedOrdersByAgency(root, args, context) {
  let results = await OrderController.getAllAcceptedOrdersByAgency(root, args, context)
  return results
},
 async getAllOrdersByRider(root, args, context) {
  let results = await OrderController.getAllOrdersByRider(root, args, context)
  return results
},

async getOneOrder(root, args, context) {
  let result = await OrderController.getOneOrder(root, args, context)
  return result
},

async getReportByAdmin(root, args, context) {
  let result = await OrderController.getReportByAdmin(root, args, context)
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
      let restaurant_id = result.data.restaurant._id
      pubsub.publish(ORDER_UPDATED, { orderUpdated: result, customer_id, restaurant_id })
      if(result.data.status === 'accepted'){
        let agencies = result.data.agencies
        pubsub.publish(ORDER_GET_BY_AGENCY, { orderGetByAgency: result, agencies })
      }
      return result
    },

    async updateOrderByAgency(root, args, context) {
      let result = await OrderController.updateOrderByAgency(root, args, context)
      if(args.agency_status === 'accept'){
        let rider_id = result.data.rider
        pubsub.publish(ORDER_GET_BY_RIDER, { orderGetByRider: result, rider_id })
      }else{
        if(result.error === false){
          let agencies = result.data.agencies
          pubsub.publish(ORDER_GET_BY_AGENCY, { orderGetByAgency: result, agencies })
        }
      }
      return result
    },

    async checkOrderRelatedApi(root, args, context) {
      let result = await OrderController.checkOrderRelatedApi(root, args, context)
      return result
    },
    async pushOrderLocationByRider(root, args, context) {
      let result = await OrderController.pushOrderLocationByRider(root, args, context)
      if(!result.error){
        let agency = result.data.agency
        pubsub.publish(RIDER_LOCATION_PUSHED, { riderLocationPushed: result, agency })
      }
      return result
    },
  },
}

module.exports = resolvers
