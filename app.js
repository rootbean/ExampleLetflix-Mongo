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

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/api', api)

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname + '/client/dist'));
})

module.exports = app
