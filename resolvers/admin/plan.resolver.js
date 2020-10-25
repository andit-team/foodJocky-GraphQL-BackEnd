const PlanController = require('../../controllers/admin/plan.controller')

const resolvers = {
  Query: {
    async getAllPlans(root, args, context) {
       let results = await PlanController.getAllPlans(root, args, context)
       return results
    },

    async getOnePlan(root, args, context) {
        let result = await PlanController.getOnePlan(root, args, context)
        return result
     },
  },
  Mutation: {
    async addPlan(root, args, context) {
      let result = await PlanController.addPlan(root, args, context)
      return result
    },

    async deletePlan(root, args, context) {
        let result = await PlanController.deletePlan(root, args, context)
        return result
      },

      async updatePlan(root, args, context) {
        let result = await PlanController.updatePlan(root, args, context)
        return result
      },
  },
};

module.exports = resolvers;