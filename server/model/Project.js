const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  client: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  progress: {
    type: Number,
    required: true,
    default: 0
  },
  manager: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('Project', projectSchema)
