const OwnerController = require('../../controllers/owner/owner.controller')

const resolvers = {
  Subscription: {
    ownerAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED),
        (payload, variables) => {
          return payload.reciverId === variables.reciverId;
        }
      )
    },
  },
  Query: {
    async getAllOwners(root, args, context) {
       let results = await OwnerController.getAllOwners(root, args, context)
       return results
    },
  },
  Mutation: {
    async addOwner(root, args, context) {
      let result = await OwnerController.addOwner(root, args, context)
      return result
    },
    
    async updateOwner(root, args, context) {
      let result = await OwnerController.updateOwner(root, args, context)
      return result
    },

    async deleteOwner(root, args, context) {
        let result = await OwnerController.deleteOwner(root, args, context)
        return result
      },
  },
};

module.exports = resolvers;