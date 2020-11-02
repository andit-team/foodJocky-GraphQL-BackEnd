
const { mergeTypeDefs } = require('graphql-tools-merge-typedefs')
const { mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('apollo-server-express')

const categorySchema = require('./schemas/admin/category.schema')
const planSchema = require('./schemas/admin/plan.schema')
const ownerSchema = require('./schemas/owner/owner.schema')
const adminSchema = require('./schemas/admin/admin.schema')
const restaurantSchema = require('./schemas/restaurant/restaurant.schema')
const foodSchema = require('./schemas/food/food.schema')

const categoryResolver = require('./resolvers/admin/category.resolver')
const planResolver = require('./resolvers/admin/plan.resolver')
const ownerResolver = require('./resolvers/owner/owner.resolver')
const adminResolver= require('./resolvers/admin/admin.resolver')
const restaurantResolver= require('./resolvers/restaurant/restaurant.resolver')
const foodResolver= require('./resolvers/food/food.resolver')

const types = [
	categorySchema,
	ownerSchema,
	planSchema,
	adminSchema,
	restaurantSchema,
	foodSchema,
]

const typeDefs = mergeTypeDefs(types)

const resolvers = [
	categoryResolver,
	planResolver,
	ownerResolver,
	adminResolver,
	restaurantResolver,
	foodResolver,
  ]

const graphQlResolvers = mergeResolvers(resolvers)

module.exports = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: graphQlResolvers
})