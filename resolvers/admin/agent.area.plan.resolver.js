const AgentAreaPlanController = require('../../controllers/admin/agent.area.plan.controller')

const resolvers = {
  Query: {
    async getAllAgentAreaPlan(root, args, context) {
       let results = await AgentAreaPlanController.getAllAgentAreaPlan(root, args, context)
       return results
    },
    async getOneAgentAreaPlan(root, args, context) {
        let result = await AgentAreaPlanController.getOneAgentAreaPlan(root, args, context)
        return result
     },
  },
  Mutation: {
    async addAgentAreaPlan(root, args, context) {
      let result = await AgentAreaPlanController.addAgentAreaPlan(root, args, context)
      return result
    },

    async deleteAgentAreaPlan(root, args, context) {
        let result = await AgentAreaPlanController.deleteAgentAreaPlan(root, args, context)
        return result
      },

      async updateAgentAreaPlan(root, args, context) {
        let result = await AgentAreaPlanController.updateAgentAreaPlan(root, args, context)
        return result
      },
  },
}

module.exports = resolvers