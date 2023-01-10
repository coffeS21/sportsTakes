const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment.js")

// //get all comment
commentRouter.get("/", (req, res, next)=>{
    Comment.find((err, comment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

//get users comments
commentRouter.get("/user", (req, res, next) => {
    Comment.find({ user: req.auth._id }, (err, comment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
  })

  //create comment
commentRouter.post("/:takeId/:userId", (req,res,next)=>{ 
    req.body.take = req.params.takeId
    req.body.user = req.params.userId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//delete comment
commentRouter.delete("/:commentId", (req, res, next)=>{    
    Comment.findOneAndDelete({_id: req.params.commentId, user: req.auth._id}, (err, deletedComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`the comment titled ${deletedComment.commentTitle} has been removed from the data base `)
    })
})

module.exports = commentRouter