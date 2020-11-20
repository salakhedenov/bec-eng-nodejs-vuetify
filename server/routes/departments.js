const router = require('express').Router()
const Department = require('../model/Department')
const verify = require('./verifyToken')

router.get('/', async (req, res) => {
  try {
    const departments = await Department
      .find({})
    res.json(departments)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

router.post('/', verify, async (req, res) => {
  const department = new Department({
    code: req.body.code,
    name: req.body.name
  })
  try{
    const savedDepartment = await department.save()
    res.json(savedDepartment)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router
