'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const showCtrl = require('../controllers/show')
const commentCtrl = require('../controllers/comment')
const likeCtrl = require('../controllers/like')
const auth = require('../middlewares/auth')
const api = express.Router()

//Shows
api.get('/shows', showCtrl.getShows)
api.get('/shows/:id', showCtrl.getShowById)
api.get('/shows/byName/:query', showCtrl.searchByShowName)

//Comments
api.post('/comments', auth ,commentCtrl.addComment)
api.get('/comments/show/:showId',commentCtrl.getCommentsShow)

//Likes
api.get('/likes/shows/:show/:user', auth,likeCtrl.getLikesUser)
api.get('/likes/cant/:show', likeCtrl.getTotalLikeShow)
api.post('/likes', auth,likeCtrl.actualizarLikeUser)

//Users
//Create user
api.post('/users', userCtrl.signUp)
api.get('/users/:id', auth ,userCtrl.findById)
api.put('/users/showsFavorites/:userId', auth ,userCtrl.showsFavorites)
//Login
api.post('/auth/local', userCtrl.signIn)

module.exports = api
