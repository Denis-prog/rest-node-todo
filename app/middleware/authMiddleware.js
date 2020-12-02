const jwt = require('jsonwebtoken');
const { jwtKey } = require('../../config/app').jwt;

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided' });
    }

    const token = authHeader.replace('Bearer', '');

    try {
        const payLoad = jwt.verify(token, jwtKey);
        if (payLoad.type !== 'access') {
            res.status(401).json({ message: 'invalid token' });
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'invalid token' });
        }
    }

    next();
};
