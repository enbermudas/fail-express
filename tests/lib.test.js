const request = require('supertest');
const app = require('./server');

const consoleError = console.error;

beforeAll(() => console.error = jest.fn());
afterAll(() => console.error = consoleError);

describe('Test the middleware', () => {
  test('It should not return an error if everything goes right', async (done) => {
    request(app)
      .get('/success')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('It should return and 404 error', async (done) => {
    request(app)
      .get('/error/404')
      .expect(404)
      .end((err, res) => {
        expect(res.body.name).toEqual('Not Found');
        return done(err);
      })
  });

  test('It should return and 502 error', async (done) => {
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
});
