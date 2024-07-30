// api/index.js
const webhooks = require('./webhooks');

module.exports = (req, res) => {
  return webhooks(req, res);
};