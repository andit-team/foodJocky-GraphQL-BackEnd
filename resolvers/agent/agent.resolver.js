const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const AgentController = require('../../controllers/agent/agent.controller')

const AGENT_ADDED = "AGENT_ADDED"

const resolvers = {
  Subscription: {
    agentAdded: {
      subscribe: () => pubsub.asyncIterator(AGENT_ADDED),
    }
  },
  Query: {
    async getAllAgents(root, args, context) {
       let results = await AgentController.getAllAgents(root, args, context)
       return results
    },

    async getOneagent(root, args, context) {
      let result = await AgentController.getOneagent(root, args, context)
      return result
   },

   async agentLogin(root, args, context) {
    let result = await AgentController.agentLogin(root, args, context)
    return result
  },

  async verifyAgentToken(root, args, context) {
    let result = await AgentController.verifyAgentToken(root, args, context)
    return result
  }

  },
  Mutation: {
    async addAgent(root, args, context) {
      let result = await AgentController.addAgent(root, args, context)
      pubsub.publish(AGENT_ADDED, { agentAdded: result })
      return result
    },

    async updateAgent(root, args, context) {
      let result = await AgentController.updateAgent(root, args, context)
      return result
    },

    async deleteAgent(root, args, context) {
        let result = await AgentController.deleteAgent(root, args, context)
        return result
      },

      async updateAgentWithStatus(root, args, context) {
        let result = await AgentController.updateAgentWithStatus(root, args, context)
        return result
      },
  },
}

module.exports = resolvers
