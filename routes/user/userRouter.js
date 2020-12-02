const users = require('../../app/controllers/users');

module.exports = (app) => {
    app.post('/createUser', users.createUser);
/*     app.get('/getCurrentUser/:id', users.getCurrentUser);
    app.get('/getAllUsers', users.getAllUsers); */
};
