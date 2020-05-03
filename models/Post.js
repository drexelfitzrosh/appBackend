const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
  
})

module.exports=  mongoose.model('Post', EventSchema)