
const { mergeTypeDefs } = require('graphql-tools-merge-typedefs')
const { mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('apollo-server-express')

const userSchema = require('./schemas/user')

const userResolvers = require('./resolvers/user')

const types = [
	userSchema,
]

const typeDefs = mergeTypeDefs(types)

const resolvers = [
	userResolvers,
  ]

const graphQlResolvers = mergeResolvers(resolvers)

module.exports = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: graphQlResolvers
})