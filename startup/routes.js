const express = require('express');
const OLXnode = require('../routes/OLXnode');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/OLX', OLXnode);
  app.use(error);
}