'use strict'

const Like = require('../models/like')

function getLikesUser(req, res){
  let show = req.params.show
  let user = req.params.user

  Like.findOne({ show, user }, (err, like) => {
    if (err) return res.status(500).send({message: `Err: ${err}`})
    if (!like) return res.status(200).send({ unlike: false, like: false })

    res.status(200).json(like)
  })
}

function getTotalLikeShow(req, res){
  let show = String(req.params.show)

  Like.find({ show }, (err, likes) => {
    if (err) return res.status(500).send({message: `Err: ${err}`})
    if (!likes) return res.status(200).send({message: `No likes`})

    let cantLike = 0
    let cantUnLike = 0  

    likes.forEach((value, index, array ) =>{
      if(value.like) cantLike ++
      if(value.unlike) cantUnLike++  
    })

    res.status(200).json({like: cantLike, unlike: cantUnLike})
  })

}

function actualizarLikeUser(req, res){
    let show = String(req.body.show)
    let user = req.body.user
    
    Like.findOne({ show, user }, (err, like) => {
    if (err) return res.status(500).send({message: `Err: ${err}`})
    if (!like) addLikeShow(req.body, req, res)
    else removeLike(req.body, req, res)  
  })
}

function addLikeShow(data,req, res){
  let like = new Like()
  like.show = data.show
  like.user = data.user
  like.like = data.like
  like.unlike = data.unlike

  like.save((err, like) => {
    if (err) return res.status(500).send({message: `Err: ${err} `})

    return res.status(200).send({ message: 'Create Like' + like})
  })
}

function removeLike(data, req, res){
   let show = data.show
   let user = data.user

   Like.findOneAndUpdate({ show, user }, data ,(err, like) => {
     if (err) return res.status(500).send({message: `Err: ${err}`})
      
      return res.status(200).send({ message: 'like update!' + like })
  })
}

module.exports = {
  getLikesUser,
  getTotalLikeShow,
  actualizarLikeUser
}
