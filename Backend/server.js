require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models/index')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
db.initialize()

// USER ROUTES
const userRoutes = require('./routes/users/userAuth.routes.js')

// SPACE OWNER ROUTES
const spaceOwnerRoutes = require('./routes/spaceOwner/ownerAuth.routes.js')

const corsOption = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  exposedHeaders: ['x-access-token'],
  credentials: true,
}


app.get('/', (req, res) => {
  res.send(`API is Running on Port ${process.env.PORT}`)
})
app
  .use(cors(corsOption))
  .use(morgan('dev'))
  .use(
    require('express-session')({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    })
  )

  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use(express.static(path.join(__dirname, 'public')))

  // Admin Routes
  // Space Owner Routes
  .use('/v1/landlord', spaceOwnerRoutes)
  // User Routes
  .use('/v1/user', userRoutes)
  .use(function (req, res) {
    res.status(404).json({
      status: 404,
      message: "Sorry can't find that!",
      data: {}
    })
  })

server.listen(process.env.PORT, () => {
  console.log('Server is running at PORT', process.env.PORT)
})
