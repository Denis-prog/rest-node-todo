const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
    login: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

userSchema.set('toJSON', {
    virtuals: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
