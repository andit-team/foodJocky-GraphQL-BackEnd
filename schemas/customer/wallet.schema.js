const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getWalletPageData: WalletPageData
}

type Mutation {
    addBalance(amount: Int): BanalceAddOutput
}

type BanalceAddOutput {
    error: Boolean
    msg: String
}

type WalletPageOutput {
    error: Boolean
    msg: String
    data: WalletPageData
}

type WalletPageData {
    balance: Float
    totalCredit: Float
    totalDebit: Float
    transactions: CustomerTransactionData
}

type CustomerTransactionData {
    _id: ID
    current_balance: Float
    previous_balance: Float
    amount: Float
    cashback: Float
    cashback_percentange: Int
    debit_or_credit: String
    reason: String
    status: String
    user: CustomerData
    createdAt: Int
    updatedAt: Int
}
`
module.exports = typeDefs