const mongoose = require('mongoose');
const { Schema } = mongoose;

const post = new Schema({
  title:  String, // String is shorthand for {type: String}
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  tags: [{ type: String, index: true }],
  meta: {
    upvotes: Number,
    downvotes:  Number,
    insightful: Number,
    geshmak: Number,
    lumdish: Number,
    pilpul: Number,
  },
    auther: {
        auther: {
            _id: String,
            firstName: String,
            lastName: String,
            email: String,
        }
    }
});

module.exports = mongoose.model('Post', post);