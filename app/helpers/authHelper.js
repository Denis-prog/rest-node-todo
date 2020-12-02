const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const { jwtKey, tokens } = require('../../config/app').jwt;

const generateAccessToken = (userId) => {
    const payLoad = {
        userId,
        type: tokens.access.type,
    };

    const options = { expiresIn: tokens.access.expiresIn };
    return jwt.sign(payLoad, jwtKey, options);
};

const generateRefreshToken = () => {
    const payLoad = {
        id: uuid(),
        type: tokens.refresh.type,
    };

    const options = {
        expiresIn: tokens.refresh.expiresIn,
    };
    return {
        id: payLoad.id,
        token: jwt.sign(payLoad, jwtKey, options),
    };
};

const replaceDbRefreshToken = (tokenRefreshId, tokenAccess, userId) => Token
    .findOneAndRemove({ userId })
    .exec()
    .then(() => Token.create({ tokenRefreshId, tokenAccess, userId }));

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
};
