const Column = require('../models/column');
const Note = require('../models/note');
const getUserIdByToken = require('../helpers/getUserIdByToken');

const x = (rese, d) => rese.status(200).json(d);

async function getAllDataByUser(req, res) {
    const authHeader = req.get('Authorization');
    const data = {};
    const userId = await getUserIdByToken(authHeader, res);
    await Column
        .find({ user: userId })
        .exec()
        .then((columns) => {
            data.columns = columns;
        })
        .catch((err) => res.status(500).json(err));
    await Note
        .find({ user: userId })
        .exec()
        .then((notes) => {
            data.notes = notes;
        })
        .catch((err) => res.status(500).json(err));


    setTimeout(x, 5000, res, data);
}

module.exports = {
    getAllDataByUser,
};
