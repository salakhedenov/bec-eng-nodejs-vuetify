const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')
const verify = require('./verifyToken')

// REGISTER
router.post('/register', async (req, res) => {

  //Validate data
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('Email already exists')

  // Hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new User ({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    position: req.body.position,
    department: req.body.department
  })
  try {
    await user.save()
    res.send(user)// : user._id})
  } catch (err) {
    res.status(400).send(err)
  }
 })

 //LOGIN
 router.post('/login', async (req, res) => {
   //Validate data
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if the user is already in the database
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).send('Email is not found')

  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid Password')

  //Creat and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token)
    .send({
      token,
      id: user._id,
      name: user.name,
      email: user.email
    })
 })

 // Fetch All User's name
 router.get('/', verify, async (req, res) => {
  try {
    const users = await User.find({})
      .populate('position')
      .populate('department')
    res.json(users)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// UPDATE USER'S INFO
router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({
      _id: req.params.id
    }, {
      $set: {
        name: req.body.name,
        department: req.body.department,
        position: req.body.position
      }
    })
    res.json(updatedUser)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router
