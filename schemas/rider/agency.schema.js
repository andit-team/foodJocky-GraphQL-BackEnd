const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    agencyLogin(mobile: String , password: String): AgencyAddOutPut
    verifyAgencyToken(token: String): AgencyAddOutPut
}

type Mutation {
    addAgency(agencyInput: AgencyInput): AgencyAddOutPut
}

type AgencyAddOutPut {
    token: String
    error: Boolean
    msg: String
    data: AgencyData
}

type AgencyEditDeleteOutput {
    error: Boolean
    msg: String
}

input AgencyInput {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
}

type AgencyData {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
}
`
module.exports = typeDefs