'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Connection error connect BD: ${err}`)
  }
  console.log('Connection BD OK...')

  app.listen(config.port, () => {
    console.log(`API Leflix http://localhost:${config.port}`)
  })
})
