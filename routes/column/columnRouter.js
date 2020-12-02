const columns = require('../../app/controllers/columns');
const authMiddleware = require('../../app/middleware/authMiddleware');

module.exports = (app) => {
    app.post('/createColumn', authMiddleware, columns.createColumn);
    app.put('/updateColumn/:id', authMiddleware, columns.updateColumn);
    app.delete('/deleteColumn/:id', authMiddleware, columns.deleteColumn);
};
