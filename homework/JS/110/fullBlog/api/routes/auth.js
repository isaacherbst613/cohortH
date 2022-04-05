const express = require('express');
const router = express.Router();
const {cryptoHash, compare} = require('../hash');

router.post('/register', async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return next(new Error('Username, email and password are required'));
    }

    try {
        const { username, email, password } = req.body;
        const hashedPassword = cryptoHash(password);
        const user = { username, email, password: hashedPassword };
        const result = await global.users.insertOne(user);
        console.log(result);
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.sendStatus(201);
    } catch (err) {
        if (err.code === 11000) {
            return next(new Error("Username already exists"));
        }
        return next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await global.users.findOne({ username: req.body.username });
        if (user) {
            const match = compare(req.body.password, user.password);
            if (match) {
                req.session.user = req.body.username;
                res.setHeader('Access-Control-Allow-Credentials', true);
                return res.sendStatus(200);
            }
        }
        const error = new Error("Invalid username or password");
        error.status = 401;
        return next(error);
    } catch (err) {
        return next(err);
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.end();
});

module.exports = router;