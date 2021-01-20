const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const AgencyController = require('../../controllers/rider/agency.controller')

const AGENCY_ADDED = "AGENCY_ADDED"

const resolvers = {
  Query: {
   async agencyLogin(root, args, context) {
    let result = await AgencyController.agencyLogin(root, args, context)
    return result
  },

  async verifyAgencyToken(root, args, context) {
    let result = await AgencyController.verifyAgencyToken(root, args, context)
    return result
  }

  },
  Mutation: {
    async addAgency(root, args, context) {
      let result = await AgencyController.addAgency(root, args, context)
      return result
    },

    async updateAgencyWithStatus(root, args, context) {
      let result = await AgencyController.updateAgencyWithStatus(root, args, context)
      return result
    }
  },
}

module.exports = resolvers
