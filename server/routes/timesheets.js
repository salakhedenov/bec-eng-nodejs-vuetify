const router = require('express').Router()
const Week = require('../model/Week')
const Day = require('../model/Day')
const verify = require('./verifyToken')
const Drawing = require('../model/Drawing')

// FETCH EXISTED TIMESHEETS BY USER ID
router.get('/:uid', verify, async (req, res) => {
  try {
    const uid = req.params.uid
    const week = await Week
       .find({
         user: uid
      })
      .populate({
        path: 'days',
        populate: {
          path: 'drawing',
          select: 'code',
          populate: {
            path: 'project',
            select: 'code'
          }
        }
      })
    res.json(week)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// FETCH EXISTED TIMESHEETS BY USER ID AND WEEKNUMBER
router.get('/:uid/:weekNumber', verify, async (req, res) => {
  try {
    const uid = req.params.uid
    const weekNumber = req.params.weekNumber
    const week = await Week
       .findOne({
         user: uid,
         weekNumber: weekNumber
      })
      .populate({
        path: 'days',
        populate: {
          path: 'drawing',
          select: 'code',
          populate: {
            path: 'project',
            select: 'code'
          }
        }
      })
    res.json(week)
  } catch (err) {
    res.json({
      message: err
    })
  }
})


// POST TIMESHEET DATA
router.post('/', verify, async (req, res) => {
  const data = req.body
  let existWeek = null
  // CHEKING WHETHER SUBMITTED WEEK ALREADY EXIST ON DB
  try {
    existWeek = await Week.findOne({weekNumber: data.weekNumber})
  } catch (error) {
    console.log(error)
  }
  if (!existWeek) {
    const week = new Week ({
      weekNumber: data.weekNumber,
      submitted: data.submitted,
      approved: data.approved,
      user: data.user,
      days: data.days
    })
    // await week.save()

    week.days.map(async (item) => {
      const spentHours = item.monday + item.tuesday + item.wednesday + item.thursday + item.friday + item.saturday + item.sunday
      const d = await Drawing.findOne({ _id: item.drawing })
      await d.updateOne({ spenthours: d.existingHours() + spentHours })
    })

    res.json(week)
  } else {
    res.json({
      message: 'Data with this week number already in database'
    })
  }
})

/*
// POST TIMESHEET DATA
router.post('/', verify, async (req, res) => {
  const items = req.body
  let existWeek = null
  let currentWeek = []
  // CHEKING WHETHER SUBMITTED WEEK ALREADY EXIST ON DB
  try {
    existWeek = await Week.find({weekNumber: items[0].weekNumber})
  } catch (error) {
    console.log(error)
  }

  if (existWeek.length === 0) {
    const week = new Week ({
      weekNumber: items[0].weekNumber,
      submitted: items[0].submitted,
      approved: items[0].approved
    })
    try {
      await week.save()
      currentWeek.push(week)
    } catch (error) {
      console.log(error)
    }
  } else {
    currentWeek = existWeek
  }

  let days = []

  // CHEKING WHETHER SUBMITTED DATA.WEEKNUMBER ALREADY EXIST ON DB
  const existWeekdays = await Day.find({week: currentWeek[0]._id})
  // IF THERE IS NO DATA WITH CURRENT WEEK, THEN CREATE NEW DATA
  if (existWeekdays.length === 0) {
    try {
      for (let i = 0; i < items.length; i++) {
        const item = new Day ({
          week: currentWeek[0]._id,
          drawing: items[i].drawing,
          monday: items[i].monday,
          tuesday: items[i].tuesday,
          wednesday: items[i].wednesday,
          thursday: items[i].thursday,
          friday: items[i].friday,
          saturday: items[i].saturday,
          sunday: items[i].sunday,
          progress: items[i].progress
        })
        await item.save()
        days.push(item)
      }
      res.json(days)
    } catch (error) {
      console.log(error)
    }
  } else {
    res.json({
      message: "Data with this weekNumber already exist!"
    })
  }
})
*/

module.exports = router
