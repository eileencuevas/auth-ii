require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig.development);

const registerUser = userInfo => {
    return db('users').insert(userInfo);
}

const login = credentials => {
    return db('users')
        .where({ 'username': credentials.username })
        .first();
}

const getUsers = () => {
    
    return db('users');
}

const generateToken = user => {
    const payload = {
        userId: user.id,
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '10m',
    }

    return jwt.sign(payload, secret, options);
}

module.exports = {
    registerUser,
    login,
    getUsers,
    generateToken,
}