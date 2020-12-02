const auth = require('../../app/controllers/auth');
const authMiddleware = require('../../app/middleware/authMiddleware');

module.exports = (app) => {
    app.post('/signIn', auth.signIn);
    app.post('/refreshTokens', auth.refreshTokens);
    app.post('/checkAuth', authMiddleware, auth.checkAuth);
};
