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

//app.set('appPath', path.join(path.normalize(`${__dirname}/../../..`), 'client/dist'));
app.set('appPath', path.join(path.normalize(`${__dirname}/../../..`), '/client/dist'));

app.use(express.static(app.get('appPath')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
});

/*
app.get('/', function(req, res) {
   const index = path.join(__dirname, 'client/dist', 'index.html');
   res.sendFile(index);
});
*/

app.use('/api', api)

module.exports = app
