const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = Schema({
    tokenRefreshId: String,
    tokenAccess: String,
    userId: String,
});

tokenSchema.set('toJSON', {
    virtuals: true,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
