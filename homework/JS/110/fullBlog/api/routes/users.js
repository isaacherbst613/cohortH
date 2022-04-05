const User  = require('../models/users');
const cryptoHash = require('../hash');

async function getAllUsers(req, res, next) {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const theUsers = await global.users.find().skip(skip).limit(limit).toArray();
    res.send(theUsers);
}

async function addUser(req, res) {
    const { username, password } = req.body;
    const id = cryptoHash(password);
    const newUser = new User({
            username: username,
            password: id
    });
    await newUser.save();

    res.status(201).send('New user ' + newUser);
}

module.exports = { getAllUsers, addUser };