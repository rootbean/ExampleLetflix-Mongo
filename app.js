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

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.use('/client', express.static(__dirname + '/client/dist'));
app.use(express.static(path.resolve(__dirname, 'client')));

app.use('/api', api)

module.exports = app
