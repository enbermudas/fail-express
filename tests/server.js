const app = require('express')();
const createError = require('http-errors');
const failExpress = require('../index.js');

app.get('/success', (req, res) => res.send({ message: 'Success' }));

app.get('/error/404', (req, res, next) => next(createError(404, 'Not Found')));

app.get('/error/502', (req, res, next) => {
  next(createError(502, 'Bad Gateway', {
    code: 'Error code',
    type: 'Error type',
  }));
});

app.use(failExpress());

module.exports = app;
