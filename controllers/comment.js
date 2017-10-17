'use strict'

const Comment = require('../models/comment')
const User = require('../models/user')

function getCommentsShow(req, res){

  let show = req.params.showId
  Comment.find({ show }, (err, comments) => {
    if (err) return res.status(500).send({message: `Err: ${err}`})
    if (!comments) return res.status(404).send({message: 'Comments not found'})  
    
    res.status(200).json(comments)
  })  
}

function addComment (req, res) {          
  let comment = new Comment()
  comment.show = req.body.show
  comment.user = req.body.user
  comment.description = req.body.description

  comment.save((err, comment) => {
    if (err) res.status(500).send({message: `Err: ${err} `})

    res.status(200).send({ message: 'Create comment'})
  })
}

module.exports = {
  getCommentsShow,
  addComment
}
