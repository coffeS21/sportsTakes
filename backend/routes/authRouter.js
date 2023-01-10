const express = require("express")
const authRouter = express.Router()
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

//signup route
authRouter.post("/signup", (req, res, next)=> {
    User.findOne({ username: req.body.username}, (err, user) => {
        if(err){
          res.status(500)
          return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("this username is already being used dude"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.removePassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.removePassword()})
        })
    })
})
//login route
authRouter.post("/login", (req,res, next)=>{
    User.findOne({username: req.body.username}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error("username or Password are incorrect"))
        }
        
        user.checkPass(req.body.password, (err, ismatch) => {
            if(err){
                res.status(403)
                return next(new Error("username or password are incorrect"))
            }
            if(!ismatch){
                res.status(403)
                return next(new Error("username or passord are incorrect"))
            }
            const token = jwt.sign(user.removePassword(), process.env.SECRET)
                return res.status(200).send({token, user: user.removePassword()})
        })
    })
})

module.exports = authRouter