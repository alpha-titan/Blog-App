const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Posts", postSchema);
