const mongoose = require('mongoose');
const Note = require('../models/note');
const getUserIdByToken = require('../helpers/getUserIdByToken');

const { ObjectId } = mongoose.Types;

async function createNote(req, res) {
    const authHeader = req.get('Authorization');
    const userId = await getUserIdByToken(authHeader, res);

    Note.create({
        text: req.body.text,
        user: new ObjectId(userId),
        column: new ObjectId(req.body.column),
    })
        .then((newNote) => res.status(200).json(newNote))
        .catch((err) => res.status(500).json(err));
}

async function updateNode(req, res) {
    const authHeader = req.get('Authorization');
    const userId = await getUserIdByToken(authHeader, res);
    const id = new ObjectId(req.params.id);
    const column = new ObjectId(req.body.column);
    Note.findOneAndUpdate(
        { _id: id, user: new ObjectId(userId) },
        { $set: { text: req.body.text, column } },
        { new: true },
    )
        .exec()
        .then((updateNote) => res.status(200).json(updateNote))
        .catch((err) => res.status(500).json(err));
}
async function deleteNote(req, res) {
    const authHeader = req.get('Authorization');
    const userId = await getUserIdByToken(authHeader, res);
    const id = new ObjectId(req.params.id);
    Note.deleteOne(
        { _id: id, user: new ObjectId(userId) },
    )
        .exec()
        .then(() => res.status(200).json({ status: 'success' }))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    createNote,
    updateNode,
    deleteNote,
};
