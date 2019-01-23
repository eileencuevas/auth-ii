const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const registerUser = userInfo => {
    return db('users').insert(userInfo);
}

module.exports = {
    registerUser,
}