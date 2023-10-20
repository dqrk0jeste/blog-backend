const Post = require('../database/Post')

const sendBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Post.find()
    res.json(blogPosts)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

const sendBlogPost = async (req, res) => {
  try {
    const { id } = req.params
    const blogPost = await Post.findOne().where('_id').equals(id)
    if(!blogPost) {
      res.status(404).json({
        message: 'post not found'
      })
      return
    }
    res.json(blogPost)
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

const handleNewBlogPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    if(title.length > 100) {
      res.status().json({
        message: 'title cannot be longer than 100 charachters'
      })
    }
    const blogPost = {
      user: req.user,
      title: title,
      text: text,
      createdAt: new Date(),
      feedback: {
        likes: 0,
        dislikes: 0
      }
    }
    await Post.create(blogPost)
    res.status(201).json({
      message: 'post created'
    })
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

const deleteBlogPost = async (req, res) => {
  try {
    const id = req.body.id
    const post = await Post.findOne().where('_id').equals(id)
    if(!post) {
      res.statsus(404).json({
        message: 'psot not found'
      })
      return
    }
    await Post.deleteOne(post)
    res.json({
      message: 'post deleted'
    })
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = { sendBlogPosts, sendBlogPost, handleNewBlogPost, deleteBlogPost }