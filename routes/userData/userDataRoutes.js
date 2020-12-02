const dataByUser = require('../../app/controllers/dataByUser');
const authMiddleware = require('../../app/middleware/authMiddleware');

module.exports = (app) => {
    app.get(
        '/getAllDataByUser',
        authMiddleware,
        dataByUser.getAllDataByUser,
    );
};
