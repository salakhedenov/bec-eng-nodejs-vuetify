const router = require('express').Router()
const Project = require('../model/Project')
const Drawing = require('../model/Drawing')
const verify = require('./verifyToken')

// FETCH ALL PROJECTS
router.get('/', verify, async (req, res) => {
  try {
    const projects = await Project
      .find({})
      .populate('manager', 'name')

    // const progress = projects.map(async (project) => {
    //   const drawings = await Drawing.find({ project: project._id }) || 0
    //   const progres = drawings.map((drawing) => drawing.progress) || 0
    //   const progressSum = progres.reduce((a, b) => (a + b) / progres.length) || 0
    //   return {
    //     _id: project._id,
    //     code: project.code,
    //     title: project.title,
    //     client: project.client,
    //     progress: project.progress,
    //     date: project.date,
    //     manager: project.manager,
    //     progressSum: progressSum
    //   }
    // })

    // const prg = await Promise.all(progress)

    // console.log(prg)
    res.json(projects)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// FETCH PROJECT BY ID
router.get('/:id', verify, async (req, res) => {
  try {
    const project = await Project
      .find({_id: id})
      .populate('manager', 'name')
    res.json(project)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// FETCH DRAWINGS BY PROJECT ID
router.get('/:id/drawings', verify, async (req, res) => {
  try {
    const drawings = await Drawing
      .find({project: req.params.id})
      .populate('developer', 'name')
      .populate('project', 'code')
    res.json(drawings)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

router.post('/', verify, async (req, res) => {
  const project = new Project({
    code: req.body.code,
    title: req.body.title,
    client: req.body.client,
    manager: req.body.manager
  })
  try{
    const savedProject = await project.save()
    res.json(savedProject)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router
