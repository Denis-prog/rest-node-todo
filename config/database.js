const mongoose = require('mongoose');
const config = require('./app');

module.exports = () => new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);

    mongoose.connection
        .on('error', (error) => reject(error))
        .on('close', () => console.log('соединение закрыто'))
        .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
});
