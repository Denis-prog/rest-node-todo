const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    column: { type: Schema.Types.ObjectId, ref: 'Column' },
    isQuickly: { type: Boolean, default: true },
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});


noteSchema.set('toJSON', {
    virtuals: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
