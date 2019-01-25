const express = require('express');
const bcrypt = require('bcryptjs');
const middleware = require('./config/middleware');
const helpers = require('../data/helpers/helperFunctions');
// const restricted = require('./middleware/restrictedMiddleware');

const server = express();

middleware(server);

server.post('/api/register', (req, res) => {
    const userInfo = req.body;
    userInfo.password = bcrypt.hashSync(userInfo.password, 16);

    helpers
        .registerUser(userInfo)
        .then(id => {
            res.status(201).json({ 
                message: `sucessfully registered as user ${id[0]}`
            });
        })
        .catch(() => {
            res.status(500).json({ 
                error: `Couldn't register. Please try again with a password and another username.` 
            })
        });
})

server.post('/api/login/', (req, res) => {
    const creds = req.body;

    helpers
        .login(creds)
        .then(user => {
            if (!user || !bcrypt.compareSync(creds.password, user.password)) {
                res.status(401).json({ message: 'You shall not pass!' });
            } else {
                const token = helpers.generateToken(user);
                res.status(200).send(token);
            }
        })
        .catch(() => {
            res.status(500).json({ 
                error: `Couldn't log in. Please try again.` 
            })
        });
})

server.get('/api/users/', restricted, (req, res) => {
    helpers
        .getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ 
                error: `Couldn't get users. Please try again.` 
            })
        });
})

module.exports = server;