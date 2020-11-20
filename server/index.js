const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./model/User')

// Import Routes
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const projectRoute = require('./routes/projects')
const drawingRoute = require('./routes/drawings')
const departmentRoute = require('./routes/departments')
const positionRoute = require('./routes/positions')
const timesheetRoute = require('./routes/timesheets')


dotenv.config()

const PORT = process.env.PORT || 3000

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => console.log('connected to db')
  )

// Middleware
app.use(express.json())
app.use(cors())

// Route Middlewares
app.use('/users', userRoute)
app.use('/posts', postRoute)
app.use('/projects', projectRoute)
app.use('/drawings', drawingRoute)
app.use('/departments', departmentRoute)
app.use('/positions', positionRoute)
app.use('/timesheets', timesheetRoute)

// Routes
app.get('/', (req, res) => {
  res.send('We are on home')
})

app.get('/:id', async (req, res) => {
  try {
    const currentUser = await User
      .findById({ _id: req.params.id})
      .populate('department')
      .populate('position')
    res.json({
      name: currentUser.name,
      position: currentUser.position.name,
      department: currentUser.department.name
    })
  } catch (err) {
    res.send(err)
  }
  
})

app.listen(PORT, () => console.log('server started'))
