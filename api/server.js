const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require('./config/middleware');

const server = express();

middleware(server);

module.exports = server;