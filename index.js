const {ApolloServer, gql} = require('apollo-server')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Post = require('./models/Post')
const User = require('./models/User')

const typeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    discription: String!
    dateCreated: String!
    user: User!
  }

  type User {
    _id: ID!
    userName: String!
    email: String!
    password: String
    createdPost: [Post!]
  }

  input PostInput {
    title: String!
    discription: String!
    dateCreated: String!
  }

  input UserInput {
    userName: String!
    email: String!
    password: String
  }

  type Query {
    posts: [Post!]
    users: [User!]
  }

  type Mutation {
    createPost(input: PostInput): Post!
    createUser(input: UserInput): User
  }
`;

const userData = async (userId) => {
  const user = await User.findOne({_id: userId})
  return {...user._doc, createdPost: await postsData(user.createdPost)}
}

const postsData = async (postId) => {
  const post = await Post.find({_id: {$in: postId}})
  console.log(post)
  const posts = await post.map(async (data)=>{
    return {...data._doc, user: await userData(data.user)}
  })
  console.log('==>', posts)
  return posts
}


const resolvers = {
  Query: {
    posts: async ()=> {
      let post = await Post.find()
      const posts = await post.map(async (data)=>{
        return {...data._doc, user: await userData(data.user)}
      })
      return posts
      },
    users: async ()=>{
      let user = await User.find()
      return user
    }
  },
  Mutation: {
    createPost: async (parent, args)=>{
      const post = new Post({
        title: args.input.title,
        discription: args.input.discription,
        dateCreated: new Date(args.input.dateCreated),
        user: '5ea64d2f001dc141006d4b52'
      })
      const userExist = await User.findById('5ea64d2f001dc141006d4b52')
      if(!userExist){
        throw new Error('user does not exist')
      }
      userExist.createdPost.push(post)
      await userExist.save()
      const res = await post.save()
      return res
    },
    createUser: async (parent, args)=>{
      const userExist = await User.findOne({email: args.input.email})
      if(userExist){
        throw new Error('Email already exist')
      }
      const hashPassword = await bcrypt.hash(args.input.password, 12)
      const user = new User({
        userName: args.input.userName,
        email: args.input.email,
        password: hashPassword,
      })
      let res = await user.save()
      res.password=null
      return res
    }
  }

}

const server = new ApolloServer({typeDefs, resolvers})

mongoose.connect(`mongodb://drexel911:Alyssamae911@cluster0-shard-00-00-lv6pm.mongodb.net:27017,cluster0-shard-00-01-lv6pm.mongodb.net:27017,cluster0-shard-00-02-lv6pm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`).then(()=>{
  server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
  })
}).catch(err=>{
  console.error(err)
})
