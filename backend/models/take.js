const mongoose = require("mongoose")
const Schema = mongoose.Schema
//this schema is an object and this object will be the blue print of each take created
const takeSchema = new Schema({

    takeTitle: {
        type: String
           
    },
    takeBody: {
        type: String
        
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
})
module.exports = mongoose.model("Take", takeSchema)
