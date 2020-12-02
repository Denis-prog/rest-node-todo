const mongoose = require('mongoose');

const { Schema } = mongoose;

const columnSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        default: 'В плане',
    },
});

columnSchema.set('toJSON', {
    virtuals: true,
});
const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
