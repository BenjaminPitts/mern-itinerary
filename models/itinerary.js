const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  activity1: String,
  activity2: String,
  activity3: String,
  activity4: String,
  activity5: String,
  activity6: String,
  lunch: String,
  dinner: String,
  image: String,
  time : { type : Date, default: Date.now }
})
const Itinerary = mongoose.model('Itinerary', itinerarySchema)

module.exports = Itinerary
