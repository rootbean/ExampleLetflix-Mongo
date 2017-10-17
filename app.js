'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path")
const api = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.set('client', path.join(path.normalize(`${__dirname}/../../..`), 'client/dist'));
app.use(express.static(app.get('client')));

app.use('/api', api)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${app.get('client')}/index.html`));
})

module.exports = app
