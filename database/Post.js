const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  desc: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number
  },
  feedback: {
    likes: {
      type: Number
    },
    dislikes: {
      type: Number
    }
  }
})

module.exports = mongoose.model('Post', postSchema)