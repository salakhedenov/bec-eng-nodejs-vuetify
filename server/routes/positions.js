const router = require('express').Router()
const Position = require('../model/Position')
const verify = require('./verifyToken')

router.get('/', async (req, res) => {
  try {
    const positions = await Position
      .find({})
    res.json(positions)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

router.post('/', verify, async (req, res) => {
  const position = new Position({
    name: req.body.name
  })
  try{
    const savedPosition = await position.save()
    res.json(savedPosition)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router