const posts = require('./post/query')
const users = require('./user/query')
const {createPost, likePost} = require('./post/mutation')
const createUser = require('./user/mutation')

const resolvers = {
  Query:{
    posts: posts,
    users: users
  },
  Mutation:{
    createPost: createPost,
    createUser: createUser,
    likePost: likePost,
  }
}

module.exports = resolvers