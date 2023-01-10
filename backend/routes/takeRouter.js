const express = require("express")
const takeRouter = express.Router()
const Take = require("../models/take")

//go to eps #9 for testing instructions
//create templets and create:
//5 users with 2 takes

//get all takes
takeRouter.get("/", (req, res, next)=>{
    Take.find((err, takes)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(takes)
    })
})

//create new take
takeRouter.post("/", (req,res,next)=>{
    req.body.user = req.auth._id
    const newTake = new Take(req.body)
    newTake.save((err, savedTake)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTake)
    })
})
//get takes by user id
takeRouter.get("/user", (req, res, next) => {
    Take.find({ user: req.auth._id }, (err, takes) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(takes)
    })
  })
//delete take
takeRouter.delete("/:takeId", (req, res, next)=>{    
    Take.findOneAndDelete({_id: req.params.takeId, user: req.auth._id}, (err, deletedTake)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`the take ${deletedTake.takeTitle} has been removed from the data base `)
    })
})

//update
takeRouter.put("/:takeId", (req,res,next) => {
    Take.findOneAndUpdate({_id: req.params.takeId, user: req.auth._id}, 
        req.body,
        {new: true},
        (err, updatedTake) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedTake)
        })
})

//upvote a take
takeRouter.put("/upvote/:takeId", (req,res,next) => {
    Take.findOneAndUpdate(
        {_id: req.params.takeId},
        {$inc: {upvote: 1}},
        {new: true},
        (err, addedVote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(addedVote)
        }
    )
})
/**
 * User's should only be able to upvote/downvote once per issue.
 * 
 */
//downvote a take
takeRouter.put("/downvote/:takeId", (req,res,next) => {
    Take.findOneAndUpdate(
        {_id: req.params.takeId},
        {$inc: {downvote: 1}},
        {new: true},
        (err, downvote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downvote)
        }
    )
})

module.exports = takeRouter