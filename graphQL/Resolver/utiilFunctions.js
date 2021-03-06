const User = require('../../models/User')
const Post = require('../../models/Post')

const userData = async (userId) => {
  const user = await User.findOne({_id: userId})
  return {...user._doc,password:null,  createdPost: await postsData.bind(this, user.createdPost)}
}

const postsData = async (postId) => {
  const post = await Post.find({_id: {$in: postId}})
  console.log(post)
  const posts = await post.map(async (data)=>{
    return {...data._doc, user: await userData.bind(this, data.user)}
  })
  console.log('==>', posts)
  return posts
}

module.exports = {
  userData: userData,
  postsData: postsData
}