require('dotenv').config();
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid Token' });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'You shall not pass!' });
    }
}

module.exports = restricted;