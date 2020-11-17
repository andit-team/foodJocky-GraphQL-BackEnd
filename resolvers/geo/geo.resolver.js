const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const GeoController = require('../../controllers/geo/generate.geo.controller')

const resolvers = {

  Query: {
    async getDivisions(root, args, context) {
       let results = await GeoController.getDivisions(root, args, context)
       return results
    },

    async getDistricts(root, args, context) {
      let result = await GeoController.getDistricts(root, args, context)
      return result
   },

   async getUpazillas(root, args, context) {
    let result = await GeoController.getUpazillas(root, args, context)
    return result
  },

  async getUnions(root, args, context) {
    let result = await GeoController.getUnions(root, args, context)
    return result
  },

  async getVillages(root, args, context) {
    let result = await GeoController.getVillages(root, args, context)
    return result
  },

  async getMunicipals(root, args, context) {
    let result = await GeoController.getMunicipals(root, args, context)
    return result
  },

  async getWards(root, args, context) {
    let result = await GeoController.getWards(root, args, context)
    return result
  },

  },

  Mutation: {
    async addGeo(root, args, context) {
      let result = await GeoController.generateAllGeo(root, args, context)
      return result
    },
  },
}

module.exports = resolvers