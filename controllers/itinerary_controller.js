const express = require('express')
const itinerary = express.Router()
//index
const Itinerary = require('../models/itinerary.js')
itinerary.get('/', (req, res)=>{
  Itinerary.find({}, (err, foundItinerary)=>{
    res.json(foundItinerary)
  })
})
//create
itinerary.post('/', (req, res)=>{
  Itinerary.create(req.body, (err, createItinerary)=>{
    Itinerary.find({}, (err, foundItinerary)=>{
      res.json(foundItinerary)
    })
  })
})
//update
itinerary.put('/:id', (req, res)=>{
  Itinerary.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateItinerary)=>{
      if (err) {
        res.send(err)
      } else {
        Itinerary.find({}, (err, foundItinerary)=>{
          res.json(foundItinerary)
        })
      }
    }
  )
})
//delete
itinerary.delete('/:id', (req, res)=>{
  Itinerary.findByIdAndRemove(req.params.id, (err, deletItinerary)=>{
    Itinerary.find({}, (err, foundItinerary)=>{
      res.json(foundItinerary)
    })
  })
})

module.exports = itinerary
