const Post = require('../../../models/Post')
const User = require('../../../models/User')
const {userData} = require('../utiilFunctions')

const createPost = async (parent, args)=>{
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
  return {...res._doc, user: await userData.bind(this, res.user)}
}

module.exports = createPost