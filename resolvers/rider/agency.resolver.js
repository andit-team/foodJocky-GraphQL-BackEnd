const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const AgencyController = require('../../controllers/rider/agency.controller')

const AGENCY_ADDED = "AGENCY_ADDED"

const resolvers = {

  Subscription: {
    agencyAdded: {
      subscribe: () => pubsub.asyncIterator(AGENCY_ADDED),
    }
  },

  Query: {
   async agencyLogin(root, args, context) {
    let result = await AgencyController.agencyLogin(root, args, context)
    return result
  },

  async verifyAgencyToken(root, args, context) {
    let result = await AgencyController.verifyAgencyToken(root, args, context)
    return result
  },

  async getAllAgencies(root, args, context) {
    let results = await AgencyController.getAllAgencies(root, args, context)
    return results
  },
  
  async getOneAgency(root, args, context) {
    let result = await AgencyController.getOneAgency(root, args, context)
    return result
  },

  },
  Mutation: {
    async addAgency(root, args, context) {
      let result = await AgencyController.addAgency(root, args, context)
      pubsub.publish(AGENCY_ADDED, { agencyAdded: result })
      return result
    },

    async updateAgencyWithStatus(root, args, context) {
      let result = await AgencyController.updateAgencyWithStatus(root, args, context)
      return result
    }
  },
}

module.exports = resolvers
