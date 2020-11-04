const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const RestaurantController = require('../../controllers/restaurant/restaurant.controller')

const RESTAURANT_ADDED = "RESTAURANT_ADDED"

const resolvers = {
  Subscription: {
    restaurantAdded: {
      subscribe: () => pubsub.asyncIterator(RESTAURANT_ADDED),
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

    async getOneRestaurant(root, args, context) {
      // todo
      let result = await RestaurantController.getOneRestaurant(root, args, context)
      return result
   },

   async restaurantLogin(root, args, context) {
     let result = await RestaurantController.restaurantLogin(root, args, context)
     return 
   }

  },
  Mutation: {
    async addRestaurant(root, args, context) {
      let result = await RestaurantController.addRestaurant(root, args, context)
      pubsub.publish(RESTAURANT_ADDED, { restaurantAdded: result });
      return result
    },
    
    async updateRestaurant(root, args, context) {
      let result = await RestaurantController.updateRestaurant(root, args, context)
      return result
    },
    
    async updateRestaurantActivity(root, args, context) {
      let result = await RestaurantController.updateRestaurantActivity(root, args, context)
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
};

module.exports = resolvers;