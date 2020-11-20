const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  position: {
    type: mongoose.Types.ObjectId,
    ref: 'Position',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  timesheets: [{
    type: mongoose.Types.ObjectId,
    ref: 'Week'
  }]
})

module.exports = mongoose.model('User', userSchema)
