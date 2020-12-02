const bodyParser = require('body-parser');
const optionsRequest = require('../routes/optionsRequest/optionsRequest');

module.exports = (app) => {
  app.use((req, res, next) => {
    optionsRequest(req, res, next);
  });
  app.use(bodyParser.json());
};
