const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    verifyOtp(otp: Int, mobile: String): VerifyOtpOutPut
}

type Mutation {
    sendOtp(mobile: String): OtpOutPut
}

type VerifyOtpOutPut {
    error: Boolean
    msg: String
}

type OtpOutPut {
    error: Boolean
    msg: String
}
`
module.exports = typeDefs