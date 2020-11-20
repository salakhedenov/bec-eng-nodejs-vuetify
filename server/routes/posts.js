const router = require('express').Router()
const User = require('../model/User')
const Post = require('../model/Post')
const verify = require('./verifyToken')

// Get back all the posts
router.get('/', /* verify, */ async (req, res) => {
  try {
    // const currentUser = await User.findById({_id: req.user._id})
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// Submit a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })
  try{
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// Specific Post
router.get('/:postId', async (req, res) => {
  try {
    // console.log(req.params.postId)
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch(err) {
    res.json({
    message: err
    })
  }
})

//Delete Post
router.delete('/:postId', async (req, res) => {
  try {
    await Post.remove({_id: req.params.postId})
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// Update a post
router.patch('/:postId', async (req, res) => {
  try{
    const updatedPost = await Post.updateOne({
      _id: req.params.postId
    }, {
      $set: {
        title: req.body.title
      }
    })
    res.json(updatedPost)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router