const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: { type: Date, default: Date.now },
    hidden: Boolean,
    tagsFollowing: [{ type: String, index: true }],
    postsCreated: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    commented: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', users);