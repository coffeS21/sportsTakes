
const mongoose = require("mongoose")
const Schema = mongoose.Schema
// comment is the comment on a take made by a user
const commentSchema = new Schema({
    comment: {
        type: String
     },
     take: {
       type: Schema.Types.ObjectId,
       ref: "Take",
       required: true
      },
      user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
})
module.exports = mongoose.model("Comment", commentSchema )