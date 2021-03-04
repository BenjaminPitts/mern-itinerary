//dependencies
const express = require('express')
const mongoose = require('mongoose')

//configuration
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

//middleware
app.use(express.json())
app.use(express.static('public'))

//controller
const itineraryController = require('./controllers/itinerary_controller.js')
app.use('/itinerary', itineraryController)

//body parser
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// Error/success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


//listener
app.listen(PORT, ()=>{
  console.log('listening on PORT: ', PORT)
})
