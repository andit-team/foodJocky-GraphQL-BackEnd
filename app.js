require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const http = require('http')
const { ApolloServer } = require('apollo-server-express')

const auth = require('./auth/auth')

const app = express()
const PORT = process.env.PORT
process.env.NODE_ENV = 'production'
let DB = process.env.DEVELOPMENT_DB_URL
if(process.env.NODE_ENV === 'production'){
    DB = process.env.DATABASE_URL
}

// Configure Mongoose to Connect to MongoDB
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((response) => {
        console.log("MongoDB Connected Successfully.")
    })
    .catch((err) => {
        console.log("Database connection failed.")
    })


// Configure Express
app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use("/uploads", express.static(path.join("uploads")))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") //* will allow from all cross domain
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

app.use(cors())

// GraphQL Functionality------------------

const schema = require('./schema')

const server = new ApolloServer({ schema, 
    context: ({ req }) => {

        let user = auth(req)
        return { user }
   }

 })

server.applyMiddleware({app})
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  })