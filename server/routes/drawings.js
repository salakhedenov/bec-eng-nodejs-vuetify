const router = require('express').Router()
const Drawing = require('../model/Drawing')
const verify = require('./verifyToken')

// FETCH ALL DRAWINGS
router.get('/', verify, async (req, res) => {
  try {
    const drawings = await Drawing
      .find({})
      .populate('developer', 'name')
    res.json(drawings)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// FETCH DRAWING BY ID
router.get('/:id', verify, async (req, res) => {
  try {
    const drawings = await Drawing
      .find({_id: req.params.id})
      .populate('developer', 'name')
      .populate('project', 'code')
    res.json(drawings)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// FETCH DRAWINGS BY USER ID
router.get('/users/:id', verify, async (req, res) => {
  try {
    const drawings = await Drawing
      .find({developer: req.params.id})
      .populate('developer', 'name')
      .populate('project', 'code')
    res.json(drawings)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// ADD NEW DRAWING
router.post('/', verify, async (req, res) => {
  const drawing = new Drawing({
    code: req.body.code,
    title: req.body.title,
    project: req.body.project,
    developer: req.body.developer,
    notes: req.body.notes,
    date: req.body.date,
    progress: req.body.progress
  })
  try{
    const savedDrawing = await drawing.save()
    res.json(savedDrawing)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router
