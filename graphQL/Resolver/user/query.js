const User = require('../../../models/User')
const {postsData} = require('../utiilFunctions')

const users =  async ()=>{
  let user = await User.find()
  const users = await user.map(async (data)=>{
    return {...data._doc, createdPost: await postsData.bind(this, data.createdPost)}
})
return users 
}

module.exports = users