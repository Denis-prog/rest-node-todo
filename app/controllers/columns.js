const moongose = require('mongoose');
const Column = require('../models/column');
const Note = require('../models/note');
const getUserIdByToken = require('../helpers/getUserIdByToken');

const { ObjectId } = moongose.Types;

async function createColumn(req, res) {
    const authHeader = req.get('Authorization');
    const userId = await getUserIdByToken(authHeader, res);

    Column.create({
        user: new ObjectId(userId),
        title: req.body.title,
    })
        .then((newColumn) => res.status(200).json(newColumn))
        .catch((err) => res.status(500).json(err));
}

async function updateColumn(req, res) {
    const authHeader = req.get('Authorization');
    const userId = await getUserIdByToken(authHeader, res);
    const id = new ObjectId(req.params.id);
    Column.findOneAndUpdate(
        { _id: id, user: new ObjectId(userId) },
        { title: req.body.title },
        { new: true },
    )
        .exec()
        .then((newColumn) => res.status(200).json(newColumn))
        .catch((err) => res.status(500).json(err));
}

async function deleteColumn(req, res) {
    const authHeader = req.get('Authorization');
    const userId = await getUserIdByToken(authHeader, res);
    const id = new ObjectId(req.params.id);
    const x = (rese) => rese.status(200).json({ status: 'success' });

    await Column.deleteOne(
        { _id: id, user: new ObjectId(userId) },
    )
        .exec()
        .catch((err) => res.status(500).json(err));


    await Note.deleteMany({ column: id })
        .exec()
        .then(() => {
            setTimeout(x, 5000, res);
        })
        .catch((err) => res.status(500).json(err));
}

/* const getColumnByUser = (req, res) => {
    Column
        .find({ user: req.params.id })
        .exec()
        .then((products) => res.status(200).json(products))
        .catch((err) => { res.status(500).json(err); });
}; */

module.exports = {
    createColumn,
    /*     getColumnByUser, */
    updateColumn,
    deleteColumn,
};
