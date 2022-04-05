const Post  = require('../models/posts');
const cryptoHash = require('../hash');

async function getAllPosts(req, res, next) {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const thePosts = await global.posts.find().skip(skip).limit(limit).toArray();
    res.send(thePosts);
}

async function addPost(req, res) {
    const { firstName, lastName, email, title, post, tags } = req.body;
    const id = cryptoHash([firstName, lastName, email]);
    const newPost = new Post({
        post:
        {
            title: title,
            post: post,
            date: new Date(),
            tags: tags,
            auther: {
                _id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
        }
    });
    await newPost.save();
    /* await global.posts.insertOne(newPost); */

    res.status(201).send('post added ' + newPost);
}

module.exports = { getAllPosts, addPost };