const Post = require('../../../models/Post')
const {userData} = require('../utiilFunctions')

const posts =  async ()=> {
  let post = await Post.find()
  const posts = await post.map(async (data)=>{
    return {...data._doc, password: null, user: await userData.bind(this, data.user)}
  })
  return posts
}

module.exports = posts