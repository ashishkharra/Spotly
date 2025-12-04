require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const connectDB = require('./configs/db.js')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)


// ROLE AUTH
const mainRoutes = require('./routes/main/auth.route.js')

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
  .use(helmet({ crossOriginOpenerPolicy: { policy: "same-origin" } }))
  .use(cors(corsOption))
  .use(morgan('dev'))
  .use(
    require('express-session')({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use(express.static(path.join(__dirname, 'public')))

  // Role Routes
  .use('/v1/api', mainRoutes)
  // Admin Routes
  // Space Owner Routes
  .use('/v1/api/owner', spaceOwnerRoutes)
  // User Routes
  .use('/v1/api/user', userRoutes)

  .use(function (req, res) {
    res.status(404).json({
      status: 404,
      message: "Sorry can't find that!",
      data: {}
    })
  })


connectDB()
server.listen(process.env.PORT, () => {
  console.log('Server is running at PORT', process.env.PORT)
})
