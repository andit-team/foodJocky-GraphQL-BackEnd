const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    getAllAgentAreaPlan: AgentAreaPlansOutPut
    getOneAgentAreaPlan(_id: ID): AgentAreaPlanAddOutPut
  }

  type Mutation {
    addAgentAreaPlan(name: String, key: String, own_commission: Float, child_commission: Float): AgentAreaPlanAddOutPut
    updateAgentAreaPlan(_id: ID, name: String, key: String, own_commission: Float, child_commission: Float): AgentAreaPlanEditDeleteOutPut
    deleteAgentAreaPlan(_id: ID): AgentAreaPlanEditDeleteOutPut
  }

  type AgentAreaPlanAddOutPut {
      error: Boolean
      msg: String
      data: AgentAreaPlanData
  }

  type AgentAreaPlanEditDeleteOutPut {
    error: Boolean
    msg: String
}

type AgentAreaPlansOutPut {
    error: Boolean
    msg: String
    data: [AgentAreaPlanData]
}

  type AgentAreaPlanData {
    _id: ID
    name: String
    key: String
    own_commission: Float
    child_commission: Float
  }
`
module.exports = typeDefs