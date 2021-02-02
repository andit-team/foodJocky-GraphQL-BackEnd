const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Query {
    getWalletPageData: WalletPageOutput
}

type Mutation {
    addBalance(amount: Int, url: String): BalanceAddOutput
    trackTransaction(_id: ID): TrackTransactionOutput
}

type TrackTransactionOutput {
    error: Boolean
    msg: String
    data: TrackTransactionData
}

type TrackTransactionData {
    status: String
}

type BalanceAddOutput {
    error: Boolean
    msg: String
    data: AddBalanceData
}

type AddBalanceData {
    transaction_id: ID
    GatewayPageURL: String
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
    transactions: [CustomerTransactionData]
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
    createdAt: String
    updatedAt: String
}
`
module.exports = typeDefs