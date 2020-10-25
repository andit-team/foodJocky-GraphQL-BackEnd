
const { mergeTypeDefs } = require('graphql-tools-merge-typedefs')
const { mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('apollo-server-express')

const categorySchema = require('./schemas/admin/category.schema')

const categoryResolver = require('./resolvers/admin/category.resolver')

const types = [
	categorySchema,
]

const typeDefs = mergeTypeDefs(types)

const resolvers = [
	categoryResolver,
  ]

const graphQlResolvers = mergeResolvers(resolvers)

module.exports = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: graphQlResolvers
})