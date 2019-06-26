const httpStatus = require("http-status");

const env = process.env.NODE_ENV === "production";

const failExpress = options => {
  // eslint-disable-next-line no-unused-vars
  return function handler(err, req, res, next) {
    let status = err.status || err.statusCode || 500;
    if (status < 400) status = 500;

    const message = httpStatus[`${status}_MESSAGE`];

    const body = { status, message };

    if (env === "production" || options.stackTrace) body.stack = err.stack;

    if (status >= 500) {
      console.error(err.stack); // eslint-disable-line no-console
      return res.status(status).send(body);
    }

    if (err.code) body.code = err.code;
    if (err.name) body.name = err.name;
    if (err.type) body.type = err.type;

    return res.status(status).send(body);
  };
};

export default failExpress;
