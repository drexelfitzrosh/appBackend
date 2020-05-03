const {gql} = require('apollo-server')

const typeDefs = gql`
type Post {
  _id: ID!
  title: String!
  discription: String!
  dateCreated: String!
  user: User!
  likes:[User!]
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
  createPost(input: PostInput): Post
  createUser(input: UserInput): User
  likePost(postId: ID!): Post
}
`;

module.exports = typeDefs