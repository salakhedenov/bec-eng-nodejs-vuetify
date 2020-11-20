const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
  week: {
    type: mongoose.Types.ObjectId,
    ref: 'Week',
    required: true
  },
  drawing: {
    type: mongoose.Types.ObjectId,
    ref: 'Drawing',
    required: true
  },
  monday: {
    type: Number,
    default: 0
  },
  tuesday: {
    type: Number,
    default: 0
  },
  wednesday: {
    type: Number,
    default: 0
  },
  thursday: {
    type: Number,
    default: 0
  },
  friday: {
    type: Number,
    default: 0
  },
  saturday: {
    type: Number,
    default: 0
  },
  sunday: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Day', daySchema)
