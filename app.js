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

app.use(express.static("client/dist")); 

app.get('/', function(req, res) {
   	res.sendFile(__dirname + "/client/dist");
});


app.use('/api', api)

module.exports = app
