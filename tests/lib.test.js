const request = require('supertest');
const express = require('express');
const createError = require('http-errors');
const failExpress = require('../index.js');

const consoleError = console.error;

beforeAll(() => console.error = jest.fn());
afterAll(() => console.error = consoleError);

describe('Test the middleware', () => {
  test('It should not return an error if everything goes right', async (done) => {
    let app = express();

    app.get('/success', (req, res) => res.send({ message: 'Success' }));

    app.use(failExpress());

    request(app)
      .get('/success')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('It should return and 404 error', async (done) => {
    let app = express();

    app.get('/error/404', (req, res, next) => next(createError(404, 'Not Found')));

    app.use(failExpress());

    request(app)
      .get('/error/404')
      .expect(404)
      .end((err, res) => {
        expect(res.body.name).toEqual('Not Found');
        return done(err);
      })
  });

  test('It should return and 502 error with code and type', async (done) => {
    let app = express();

    app.get('/error/502', (req, res, next) => {
      next(createError(502, 'Bad Gateway', {
        code: 'Error code',
        type: 'Error type',
      }));
    });

    app.use(failExpress());

    request(app)
      .get('/error/502')
      .expect(502)
      .end((err, res) => {
        expect(res.body.name).toEqual('Bad Gateway');
        expect(res.body.code).toEqual('Error code');
        expect(res.body.type).toEqual('Error type');
        return done(err);
      })
  });

  test('It should expose additional properties passed through configuration', async (done) => {
    let app = express();

    app.get('/error/403', (req, res, next) => {
      next(createError(403, 'Forbidden', { foo: 'bar' }));
    });

    app.use(failExpress({ exposeAdditionalProperties: true }));

    request(app)
      .get('/error/403')
      .expect(403)
      .end((err, res) => {
        expect(res.body.name).toEqual('Forbidden');
        expect(res.body.status).toEqual(403);
        expect(res.body.foo).toEqual('bar');
        return done(err);
      })
  });
});
