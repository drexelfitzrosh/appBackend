const Post = require('../../../models/Post')
const {userData, postLike} = require('../utiilFunctions')

const posts =  async ()=> {
  let post = await Post.find().populate('like')
  const posts = await post.map(async (data)=>{
    return {...data._doc, password: null, user: await userData.bind(this, data.user)}
  })
  return posts
}


module.exports = posts