const { gql } = require('apollo-server-express')
const typeDefs = gql`

  type Query {
    getAllTransactionsByAdmin(status: String, page: Int, pagesize: Int): GlobalTransactionOutput
  }

  type Mutation {
      updateTransactionByAdmin(_id: ID, status: String, reason: String): TransactionEditDeleteOutPut
  }

  type TransactionEditDeleteOutPut {
    error: Boolean
    msg: String
  }

  type GlobalTransactionOutput {
    error: Boolean
    msg: String
    data: GlobalTransactionPaginationData
  }

  type GlobalTransactionPaginationData {
    docs: [GlobalTransactionData]
    totalDocs: Int
  }

  type GlobalTransactionData {
    _id: ID
    current_balance: Float
    previous_balance: Float
    amount: Float
    debit_or_credit: String
    reason: String
    status: String
    user_or_restaurant: OwnerData
  }
`
module.exports = typeDefs