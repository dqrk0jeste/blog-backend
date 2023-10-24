const router = require('express').Router()

const { verifyUser } = require('../middleware/verifyUser')
const { sendBlogPosts, sendBlogPost, handleNewBlogPost, deleteBlogPost,sendBlogPostsInRange } = require('../controllers/postController')

router.get('/', sendBlogPosts)

router.get('/range', sendBlogPostsInRange)

router.get('/:id', sendBlogPost)

router.post('/create', verifyUser, handleNewBlogPost);

router.delete('/', deleteBlogPost)

module.exports = router