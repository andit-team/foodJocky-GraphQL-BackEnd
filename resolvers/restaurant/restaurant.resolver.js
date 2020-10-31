const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

//const OwnerController = require('../../controllers/owner/owner.controller')

const RESTAURANT_ADDED = "RESTAURANT_ADDED"

const resolvers = {
  Subscription: {
    restaurantAdded: {
      subscribe: () => pubsub.asyncIterator(RESTAURANT_ADDED),
    }
  },
  Query: {
    async getAllRestaurantsByOwner(root, args, context) {
       //let results = await OwnerController.getAllOwners(root, args, context)
       return {
           
       }
    },

    async getAllRestaurantsByAdmin(root, args, context) {
        //let results = await OwnerController.getAllOwners(root, args, context)
        return {
            
        }
     },

    async getOneRestaurant(root, args, context) {
      //let result = await OwnerController.getOneOwner(root, args, context)
      return {
          
      }
   },

  },
  Mutation: {
    async addRestaurant(root, args, context) {
      //let result = await OwnerController.addOwner(root, args, context)
      //pubsub.publish(RESTAURANT_ADDED, { restaurantAdded: result });
      return {
          
      }
    },
    
    async updateRestaurant(root, args, context) {
      //let result = await OwnerController.updateOwner(root, args, context)
      return {
          
      }
    },

    async deleteRestaurant(root, args, context) {
        //let result = await OwnerController.deleteOwner(root, args, context)
        return {
            
        }
      },

      async updateRestaurantStatus(root, args, context) {
        //let result = await OwnerController.deleteOwner(root, args, context)
        return {
            
        }
      },
  },
};

module.exports = resolvers;