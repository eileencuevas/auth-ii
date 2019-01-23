const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require('./config/middleware');
const helpers = require('../data/helpers/functionHelpers');

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

module.exports = server;