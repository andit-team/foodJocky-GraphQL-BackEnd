const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const RiderController = require('../../controllers/rider/rider.controller')

const RIDER_ADDED = "RIDER_ADDED"

const resolvers = {
  Subscription: {
    riderAdded: {
      subscribe: () => pubsub.asyncIterator(RIDER_ADDED),
    }
  },
  Query: {
    async getAllRiders(root, args, context) {
       let results = await RiderController.getAllRiders(root, args, context)
       return results
    },

    async getOneRider(root, args, context) {
      let result = await RiderController.getOneRider(root, args, context)
      return result
   },

   async riderLogin(root, args, context) {
    let result = await RiderController.riderLogin(root, args, context)
    return result
  },

  async verifyRiderToken(root, args, context) {
    let result = await RiderController.verifyRiderToken(root, args, context)
    return result
  }

  },
  Mutation: {
    async addRider(root, args, context) {
      let result = await RiderController.addRider(root, args, context)
      pubsub.publish(RIDER_ADDED, { ownerAdded: result })
      return result
    },

    async updateRider(root, args, context) {
      let result = await RiderController.updateRider(root, args, context)
      return result
    },

    async deleteRider(root, args, context) {
        let result = await RiderController.deleteRider(root, args, context)
        return result
      },

      async updateRiderWithStatus(root, args, context) {
        let result = await RiderController.updateRiderWithStatus(root, args, context)
        return result
      },
  },
}

module.exports = resolvers
