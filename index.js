const {ApolloServer, gql} = require('apollo-server')
const mongoose = require('mongoose')
const Post = require('./models/Post')
const User = require('./models/User')
const typeDefs = require('./graphQL/Schema/schema')
const resolvers = require('./graphQL/Resolver/resolvers')

const server = new ApolloServer({typeDefs, resolvers})

mongoose.connect(`mongodb://drexel911:Alyssamae911@cluster0-shard-00-00-lv6pm.mongodb.net:27017,cluster0-shard-00-01-lv6pm.mongodb.net:27017,cluster0-shard-00-02-lv6pm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`).then(()=>{
  server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
  })
}).catch(err=>{
  console.error(err)
})
