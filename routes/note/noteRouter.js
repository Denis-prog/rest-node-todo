const notes = require('../../app/controllers/notes');
const authMiddleware = require('../../app/middleware/authMiddleware');

module.exports = (app) => {
    app.post('/createNote', authMiddleware, notes.createNote);
    app.put('/updateNote/:id', authMiddleware, notes.updateNode);
    app.delete('/deleteNote/:id', authMiddleware, notes.deleteNote);
};
