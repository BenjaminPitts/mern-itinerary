const express = require('express')
const animal = express.Router()
//index
const Animal = require('../models/contact.js')
animal.get('/', (req, res)=>{
  Animal.find({}, (err, foundAnimals)=>{
    res.json(foundAnimals)
  })
})
//create
animal.post('/', (req, res)=>{
  Animal.create(req.body, (err, createdAnimal)=>{
    Animal.find({}, (err, foundAnimals)=>{
      res.json(foundAnimals)
    })
  })
})
//update
animal.put('/:id', (req, res)=>{
  Animal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedAnimal)=>{
      if (err) {
        res.send(err)
      } else {
        Animal.find({}, (err, foundAnimals)=>{
          res.json(foundAnimals)
        })
      }
    }
  )
})
//delete
animal.delete('/:id', (req, res)=>{
  Animal.findByIdAndRemove(req.params.id, (err, deleteAnimal)=>{
    Animal.find({}, (err, foundAnimals)=>{
      res.json(foundAnimals)
    })
  })
})

module.exports = animal
