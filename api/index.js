// api/index.js
const webhooks = require('./webhook');

module.exports = (req, res) => {
  return webhooks(req, res);
};