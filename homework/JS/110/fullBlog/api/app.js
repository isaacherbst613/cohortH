const createError = require('http-errors');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const {getAllAuthors, getAuthorByID} = require('./routes/authors');
const {getAllPosts, addPost} = require('./routes/posts');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/public'))); 
/* set proxy on client to find from server, no need for cors */
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

app.use(async (req, res, next) => {
    await mongoose.connect('mongodb://localhost:27017/blog');
    next();
});


// ------------------------------
// <<< UNAUTHENTICATED ROUTES >>>
// ------------------------------

//get authors info
app.get('/authers', getAllAuthors);
app.get('/authersPosts/:id', getAuthorByID);

app.get('/posts', getAllPosts);

//login-signup-logout
app.use('/authentication', require('./routes/auth'));


// ------------------------------
// <<< AUTHENTICATED ROUTES >>>
// ------------------------------

//add new post
app.post('/posts', addPost);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

server.listen(4000);
