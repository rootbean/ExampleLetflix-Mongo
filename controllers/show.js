'use strict'

const request = require('request')

function getShowById (req, res) {
  let id = req.params.id
  return getRequest(`https://api.tvmaze.com/shows/${id}`, req, res)
}

function getShows (req, res ){
  return getRequest('https://api.tvmaze.com/shows', req, res)
}

function searchByShowName(req, res){
  let query = req.params.query
  getRequestSearchName('https://api.tvmaze.com/shows', query, req, res)
}

function getRequest(urlApi, req, res) {
  return request(urlApi, {json: true}, (err, reply, body) => {
    if (err) return console.log(err)

    res.status(200).json(body)
  })
}

function getRequestSearchName(urlApi, query ,req, res){
  return request(urlApi, { json: true }, (err, reply, body) => {
    if (err) return console.log(err)
    if(!body) return res.status(404).send({message: 'Shows not found'}) 

    let show = []

    body.forEach( (value, index, array) => {
      if(value.name.toUpperCase().indexOf(query.toUpperCase()) !== -1){
        show.push(value)
      }
    })

    res.status(200).json(show)
  })
}

module.exports = {
  getShowById,
  getShows,
  searchByShowName
}