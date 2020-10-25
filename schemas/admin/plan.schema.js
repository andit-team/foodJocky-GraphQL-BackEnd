const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    getAllPlans: PlansOutPut
    getOnePlan(_id: ID): planAddOutPut
  }

  type Mutation {
    addPlan(planInput: PlanInput): planAddOutPut
    deletePlan(_id: ID): OutPut
    updatePlan(updatePlanInput: UpdatePlanInput): OutPut 
  }

  type planAddOutPut {
      error: Boolean
      msg: String
      data: PlanData
  }

  type OutPut {
    error: Boolean
    msg: String
}

type PlansOutPut {
    error: Boolean
    msg: String
    data: [PlanData]
}

input PlanInput {
    title: String
    price: Int
    commision: Int
    duration: String
    feature: Boolean
}

input UpdatePlanInput {
    _id: ID
    title: String
    price: Int
    commision: Int
    duration: String
    feature: Boolean
  }

  type PlanData {
    _id: ID
    title: String
    price: Int
    commision: Int
    duration: String
    feature: Boolean
  }
`
module.exports = typeDefs