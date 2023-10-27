const Post = require('../database/Post')

const sendBlogPostsInRange = async (req, res) => {
  const from = req.query.from
  const count = req.query.count
  try {
    const blogPosts = await Post.find().sort({ createdAt: 'desc' }).skip(from - 1).limit(count).exec()
    res.json(blogPosts)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

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
    const { title, text, desc } = req.body;
    if(title.length > 100) {
      res.status(409).json({
        message: 'title cannot be longer than 100 charachters'
      })
      return
    } else if(desc.length > 300) {
      res.status(409).json({
        message: 'description cannot be longer than 300 charachters'
      })
      return
    }
    const blogPost = {
      user: req.user,
      title: title,
      desc: desc,
      text: text,
      createdAt: Date.now(),
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
        message: 'post not found'
      })
      return
    }
    if(post.user !== req.user) {
      res.status(403).json({
        message: 'you cannot delete this post'
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

module.exports = { sendBlogPosts, sendBlogPost, handleNewBlogPost, deleteBlogPost, sendBlogPostsInRange }