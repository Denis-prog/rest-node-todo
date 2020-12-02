const Token = require('../models/token');

module.exports = (authHeader, res) => Token
    .find({ tokenAccess: authHeader })
    .exec()
    .then((token) => token[0].userId)
    .catch((err) => res.status(500).json(err));
