const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    min: 1,
    max: 6
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  }
})

module.exports = mongoose.model('Department', departmentSchema)
