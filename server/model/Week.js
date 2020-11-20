const { required } = require('@hapi/joi')
const mongoose = require('mongoose')

const weekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true
  },
  submitted: {
    type: Boolean,
    default: false
  },
  approved: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  days: [{
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
  }]
})

module.exports = mongoose.model('Week', weekSchema)
