'use strict'

const sha512 = require('sha512')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  let passCifrada = cifrarPassword(req.body.password)
  let user = new User({
    alias: req.body.alias,
    email: req.body.email,
    password: passCifrada
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Err: ${err}` })

    return res.status(201).json({ message: 'Created user' })
  })
}

function signIn (req, res) {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'This email is not registered.' })

    if(user.password !== cifrarPassword(req.body.password))
      return res.status(403).send({message: 'The password is incorrect!.'})
    
    req.user = user
    return res.status(200).send({
      message: 'Login OK',
      token: service.createToken(user)
    })
  })
}

function findById(req, res) {
  let userId = req.params.id

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No found.' })

    return res.status(200).json(user)      
  })
}

function showsFavorites(req, res) {
  let userId = req.params.userId
  let update = req.body
  let consulta = {}

  if(!update.active){ //remove favorite
    consulta = {$pull : {showsFavorites: update.show }}
  } else { // add favorite
    consulta = {$push : {showsFavorites: update.show }}
  }

  User.findOneAndUpdate({_id: userId }, consulta, (err, show) => {
    if (err) return res.status(500).send({message: `Err: ${err}`})
      
    return res.status(200).send({ message: 'favorites update!' })
  })
}

function cifrarPassword(pass){
   return sha512(pass).toString('hex'); 
}

module.exports = {
  signUp,
  signIn,
  findById,
  showsFavorites
}
