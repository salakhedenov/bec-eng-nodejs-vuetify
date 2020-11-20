const mongoose = require('mongoose')

const drawingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    min: 6,
    max: 50
  },
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  progress: {
    type: Number,
    required: true,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  developer: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  hours: {
    type: Number
  },
  spenthours: {
    type: Number
  }
})

drawingSchema.method('existingHours', function () {
  return this.spenthours
})

module.exports = mongoose.model('Drawing', drawingSchema)
