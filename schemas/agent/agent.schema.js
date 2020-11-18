const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  agentAdded: AgentAddOutPut
}

type Query {
    getAllAgents(status: String): AgentsOutput
    getOneagent(_id: ID): AgentAddOutPut
    agentLogin(mobile: String , password: String): AgentAddOutPut
    verifyAgentToken(token: String): AgentAddOutPut
  }

  type Mutation {
    addAgent(agentInput: AgentInput): AgentAddOutPut
    updateAgent(agentInput: AgentInput): AgentEditDeleteOutput
    deleteAgent(_id: ID): AgentEditDeleteOutput
    updateAgentWithStatus(agentInput: AgentInput): AgentEditDeleteOutput
  }

  type AgentAddOutPut {
      token: String
      error: Boolean
      msg: String
      data: AgentData
  }

  type AgentEditDeleteOutput {
    error: Boolean
    msg: String
}

type AgentsOutput {
    error: Boolean
    msg: String
    data: [AgentData]
}

input AgentInput {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
    type: String
    national_id: String
    owner_address: String
    residential_or_municipal: String
    division: String
    district: String
    municipal: String
    ward: String
    upazila: String
    union: String
    village: String
    status: String
    rejection_msg: String
    trade_license_no: String
}

  type AgentData {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    email: String
    type: String
    national_id: String
    status: String
    rejection_msg: String
    owner_address: String,
    trade_license_no: String
  }
`
module.exports = typeDefs