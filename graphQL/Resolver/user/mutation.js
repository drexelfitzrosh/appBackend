const Post = require('../../../models/Post')
const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const {postsData} = require('../utiilFunctions')

const createUser = async (parent, args)=>{
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
  return {...res._doc, password:null, createdPost: await postsData.bind(this, res.createdPost)}
}

module.exports = createUser