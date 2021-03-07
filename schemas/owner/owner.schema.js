const { gql } = require('apollo-server-express')
const typeDefs = gql`

type Subscription {
  ownerAdded: ownerAddOutPut
  withdrawOwnerBalanceSubscription: withdrawOwnerBalanceSubscriptionData
}

type Query {
    getAllOwners(status: String, page: Int, pagesize: Int): OwnersOutPut
    getOneOwner(_id: ID): ownerAddOutPut
    ownerLogin(mobile: String , password: String): ownerAddOutPut
    verifyOwnerToken(token: String): ownerAddOutPut
    getWalletPageDataByOwner: OwnerWalletPageOutput
  }

  type Mutation {
    addOwner(ownerInput: OwnerInput): ownerAddOutPut
    updateOwner(ownerInput: OwnerInput): OwnerEditDeleteOutPut
    deleteOwner(_id: ID): OwnerEditDeleteOutPut
    updateOwnerWithStatus(ownerInput: OwnerInput): OwnerEditDeleteOutPut
    withdrawOwnerBalance(amount: Float): OwnerEditDeleteOutPut
  }

  type withdrawOwnerBalanceSubscriptionData {
    error: Boolean
    msg: String
    data: GlobalTransactionDataForOwner
  }

  type OwnerWalletPageOutput {
    error: Boolean
    msg: String
    data: OwnerWalletPageData
  }

  type OwnerWalletPageData {
    balance: Float
    restaurant_balace: Float
    transactions: [GlobalTransactionDataForOwner]
  }

  type ownerAddOutPut {
      token: String
      error: Boolean
      msg: String
      data: OwnerData
  }

  type OwnerEditDeleteOutPut {
    error: Boolean
    msg: String
}

type OwnersOutPut {
    error: Boolean
    msg: String
    data: OwnerPaginateData
}

type OwnerPaginateData {
  docs: [OwnerData]
  totalDocs: Int
}

input OwnerInput {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    password: String
    email: String
    type: String
    owner_address: String
    national_id: String
    status: String
    rejection_msg: String
}

  type OwnerData {
    _id: ID
    first_name: String
    last_name: String
    mobile: String
    email: String
    type: String
    owner_address: String
    national_id: String
    status: String
    rejection_msg: String
    balance: Float
    createdAt: String
    updatedAt: String
  }

  type GlobalTransactionDataForOwner {
    _id: ID
    current_balance: Float
    previous_balance: Float
    amount: Float
    debit_or_credit: String
    reason: String
    status: String
    user_or_restaurant: OwnerData
    createdAt: String
    updatedAt: String
  }
`
module.exports = typeDefs