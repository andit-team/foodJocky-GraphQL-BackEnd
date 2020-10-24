const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const USER_ADDED = 'USER_ADDED';
const UserController = require('../controllers/user')

const resolvers = {
  Subscription: {
    userAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([USER_ADDED]),
    },
  },
  Query: {
    async users(root, args, context) {
       let results = await UserController.getAllUser(root, args, context);
       return results
    },

    async userLogin(root, args, context) {
      let token = await UserController.userLogin(root, args, context);
      return {
        token: token
      }
    }
  },
  Mutation: {
    async addUser(root, args, context) {
      let result = await UserController.addUser(root, args, context)
      pubsub.publish(USER_ADDED, { userAdded: result });
      return result
    },
  },
};

module.exports = resolvers;