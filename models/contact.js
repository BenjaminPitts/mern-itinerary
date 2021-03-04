const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: String,
  gender: String,
  image: String,
  time : { type : Date, default: Date.now }
})
const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal
