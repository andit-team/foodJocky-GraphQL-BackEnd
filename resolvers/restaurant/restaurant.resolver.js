const { PubSub, withFilter } = require('apollo-server')
const pubsub = new PubSub()

const RestaurantController = require('../../controllers/restaurant/restaurant.controller')

const RESTAURANT_ADDED = "RESTAURANT_ADDED"
const RESTAURANT_ADDED_SEEN_BY_AGENT = "RESTAURANT_ADDED_SEEN_BY_AGENT"

const resolvers = {
  Subscription: {
    restaurantAdded: {
      subscribe: () => pubsub.asyncIterator(RESTAURANT_ADDED),
    },
    restaurantAddedSeeByAgent: {

      subscribe: withFilter(
        () => pubsub.asyncIterator(RESTAURANT_ADDED_SEEN_BY_AGENT),
        (payload, variables, context) => {
          return payload.agent_id === context.user.user_id
        }
      )

    }
  },
  Query: {
    async getAllRestaurantsByOwner(root, args, context) {
      let results = await RestaurantController.getAllRestaurantsByOwner(root, args, context)
      return results
    },

    async getAllRestaurantsByAdmin(root, args, context) {
        let results = await RestaurantController.getAllRestaurantsByAdmin(root, args, context)
        return results
     },

     async SearchRestaurants(root, args, context) {
      let results = await RestaurantController.SearchRestaurants(root, args, context)
      return results
   },

    async getOneRestaurant(root, args, context) {
      // todo
      let result = await RestaurantController.getOneRestaurant(root, args, context)
      return result
   },

   async restaurantLogin(root, args, context) {
     let result = await RestaurantController.restaurantLogin(root, args, context)
     return result
   },

   async verifyRestaurantToken(root, args, context) {
    let result = await RestaurantController.verifyRestaurantToken(root, args, context)
    return result
  }

  },
  Mutation: {
    async addRestaurant(root, args, context) {
      let result = await RestaurantController.addRestaurant(root, args, context)
      pubsub.publish(RESTAURANT_ADDED, { restaurantAdded: result })
      let agent = {
        agent_id: result.agent
      }
      pubsub.publish(RESTAURANT_ADDED_SEEN_BY_AGENT, { restaurantAddedSeeByAgent: result, agent })
      return result
    },
    
    async updateRestaurant(root, args, context) {
      let result = await RestaurantController.updateRestaurant(root, args, context)
      return result
    },
    
    async updateRestaurantActivityByOwner(root, args, context) {
      let result = await RestaurantController.updateRestaurantActivityByOwner(root, args, context)
      return result
    },

    async updateRestaurantActivityBySelf(root, args, context) {
      let result = await RestaurantController.updateRestaurantActivityBySelf(root, args, context)
      return result
    },

    async deleteRestaurant(root, args, context) {
        //let result = await RestaurantController.deleteOwner(root, args, context)
        return {
            
        }
      },

      async updateRestaurantStatus(root, args, context) {
        let result = await RestaurantController.updateRestaurantStatus(root, args, context)
        return result
      },
  },
}

module.exports = resolvers