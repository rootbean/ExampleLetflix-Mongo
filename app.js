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
   const index = path.join(__dirname, 'client/dist', 'index.html');
   res.sendFile(index);
});


app.use('/api', api)

module.exports = app
