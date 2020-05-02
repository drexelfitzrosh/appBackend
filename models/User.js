const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdPost: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]

})

module.exports=  mongoose.model('User', UserSchema)