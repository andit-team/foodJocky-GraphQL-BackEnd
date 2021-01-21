const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  agencyAdded: AgencyAddOutPut
}

type Query {
    agencyLogin(mobile: String , password: String): AgencyAddOutPut
    verifyAgencyToken(token: String): AgencyAddOutPut
}

type Mutation {
    addAgency(agencyInput: AgencyInput): AgencyAddOutPut
    updateAgencyWithStatus(agencyInput: AgencyInput): AgencyEditDeleteOutput
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
    national_id: String
    agency_level: String
    division: String
    district: String
    municipal: String
    upazila: String
    union: String
    agency_areas: [String]
}

type AgencyData {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
    national_id: String
    agency_level: String
    division: String
    district: String
    municipal: String
    upazila: String
    union: String
    agency_areas: [String]
}
`
module.exports = typeDefs