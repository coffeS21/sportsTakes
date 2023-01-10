const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
      type:  String, 
    required: true, 
    lowercase: true,
    unique: true
    },
    password: {
      type: String,
      required: true
    },
    joinDate: {
      type: Date,
      default: Date.now
    }
})

//pre-save hook to make the users password hashed(bcrypt)
userSchema.pre("save", function(next){
  const user = this
  if(!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err, hash)=>{
    if(err) return next(err)
    user.password = hash
    next()
  })
})

//method to check  encrypted password on login
userSchema.methods.checkPass = function(passAttempt, cb){
  bcrypt.compare(passAttempt, this.password, (err, isMatch) => {
    if(err) return cb(err)
    return cb(null, isMatch)
  })
}

//method to remove the users password so its not send to the front end
userSchema.methods.removePassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}
module.exports = mongoose.model("User", userSchema)