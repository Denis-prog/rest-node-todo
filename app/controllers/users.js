const bCrypt = require('bcrypt');
const User = require('../models/user');

const createUser = (req, res) => {
    const { login, password } = req.body;

    const hashPassword = bCrypt.hashSync(password, 10);

    User.create({
        login,
        password: hashPassword,
    })
        .then((newUser) => res.status(200).json({ status: 'success', id: newUser.id }))
        .catch((err) => res.status(500).json(err));
};

/* const getCurrentUser = (req, res) => {
    User
        .findById(req.params.id)
        .exec()
        .then((currentUser) => res.status(200).json(currentUser))
        .catch((err) => res.status(500).json(err));
};

const getAllUsers = (req, res) => {
    User.find({}, { login: 1 })
        .exec()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err));
};
 */
module.exports = {
    createUser,
/*     getCurrentUser,
    getAllUsers, */
};
