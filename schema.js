
const { mergeTypeDefs } = require('graphql-tools-merge-typedefs')
const { mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('apollo-server-express')

const categorySchema = require('./schemas/admin/category.schema')
const planSchema = require('./schemas/admin/plan.schema')
const ownerSchema = require('./schemas/owner/owner.schema')
const adminSchema = require('./schemas/admin/admin.schema')
const restaurantSchema = require('./schemas/restaurant/restaurant.schema')
const foodSchema = require('./schemas/food/food.schema')
const customerSchema = require('./schemas/customer/customer.schema')
const geoSchema = require('./schemas/geo/geo.schema')
const riderSchema = require('./schemas/rider/rider.schema')
const agentSchema = require('./schemas/agent/agent.schema')
const agentAreaPlanSchema = require('./schemas/admin/agent_area_plan.schema')
const orderSchema = require('./schemas/order/order.schema')
const settingsSchema = require('./schemas/admin/settings.schema')

const categoryResolver = require('./resolvers/admin/category.resolver')
const planResolver = require('./resolvers/admin/plan.resolver')
const ownerResolver = require('./resolvers/owner/owner.resolver')
const adminResolver= require('./resolvers/admin/admin.resolver')
const restaurantResolver= require('./resolvers/restaurant/restaurant.resolver')
const foodResolver= require('./resolvers/food/food.resolver')
const customerResolver= require('./resolvers/customer/customer.resolver')
const geoResolver= require('./resolvers/geo/geo.resolver')
const riderResolver= require('./resolvers/rider/rider.resolver')
const agentResolver= require('./resolvers/agent/agent.resolver')
const agentAreaPlanResolver = require('./resolvers/admin/agent.area.plan.resolver')
const orderResolver = require('./resolvers/order/order.resolver')
const settingsResolver = require('./resolvers/admin/settings.resolver')

const types = [
	categorySchema,
	ownerSchema,
	planSchema,
	adminSchema,
	restaurantSchema,
	foodSchema,
	customerSchema,
	geoSchema,
	riderSchema,
	agentSchema,
	agentAreaPlanSchema,
	orderSchema,
	settingsSchema,
]

const typeDefs = mergeTypeDefs(types)

const resolvers = [
	categoryResolver,
	planResolver,
	ownerResolver,
	adminResolver,
	restaurantResolver,
	foodResolver,
	customerResolver,
	geoResolver,
	riderResolver,
	agentResolver,
	agentAreaPlanResolver,
	orderResolver,
	settingsResolver
  ]

const graphQlResolvers = mergeResolvers(resolvers)

module.exports = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: graphQlResolvers
})