const httpStatus = require("http-status");

const env = process.env.NODE_ENV || "production";

const failExpress = (options = {}) => {
  // eslint-disable-next-line no-unused-vars
  return function handler(err, req, res, next) {
    let status = err.status || err.statusCode || 500;
    if (status < 400) status = 500;

    const name = httpStatus[status];
    const message = httpStatus[`${status}_MESSAGE`];

    const body = { name, status, message };

    if (env !== "production" || options.displayStackTrace) {
      body.stack = err.stack;
    }

    if (err.code) body.code = err.code;
    if (err.type) body.type = err.type;

    if (status >= 500) console.error(err.stack); // eslint-disable-line no-console

    if (options.exposeAdditionalProperties) {
      Object.keys(err).forEach(key => {
        if (!(key in body)) {
          body[key] = err[key];
        }
      });
    }

    return res.status(status).send(body);
  };
};

module.exports = failExpress;
