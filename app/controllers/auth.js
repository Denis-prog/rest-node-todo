const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const authHelper = require('../helpers/authHelper');
const { jwtKey } = require('../../config/app').jwt;

const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken();

    return authHelper.replaceDbRefreshToken(refreshToken.id, accessToken, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token,
        }));
};

const checkAuth = (req, res) => {
   
    res.status(200).json({ message: 'token is valid' });
};

const signIn = (req, res) => {
    const { login, password } = req.body;
    User.findOne({ login })
        .exec()
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: 'no user' });
                return;
            }
            const isValid = bCrypt.compareSync(password, user.password);

            if (isValid) {
                updateTokens(user.id)
                    .then((tokens) => {
                        res.json(tokens);
                    });
            } else {
                res.status(401).json({ mesage: 'invalid password' });
            }
        })
        .catch((err) => res.status(400).json({ message: err.message }));
};

const refreshTokens = (req, res) => {
    const { refreshToken } = req.body;
    let payLoad;
    try {
        payLoad = jwt.verify(refreshToken, jwtKey);
        if (payLoad.type !== 'refresh') {
            res.status(400).json({ message: 'invalid token' });
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({ message: 'Token expired' });
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: 'Invalid token' });
            return;
        }
    }

    Token.findOne({ tokenId: payLoad.id })
        .exec()
        .then((token) => {
            if (!token) {
                throw new Error('Invalid token');
            }
            return updateTokens(token.userId);
        })
        .then((tokens) => res.json(tokens))
        .catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
    signIn,
    refreshTokens,
    checkAuth,
};
