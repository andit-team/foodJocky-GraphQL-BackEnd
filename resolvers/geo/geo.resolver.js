const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const GeoController = require('../../controllers/geo/generate.geo.controller')

const resolvers = {

  Mutation: {
    async addGeo(root, args, context) {
      let result = await GeoController.generateAllGeo(root, args, context)
      return result
    },
  },
}

module.exports = resolvers