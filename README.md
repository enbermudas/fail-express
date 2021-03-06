# fail-express

[![npm version](https://badge.fury.io/js/fail-express.svg)](https://badge.fury.io/js/fail-express)
[![Build Status](https://travis-ci.com/enbermudas/fail-express.svg?branch=master)](https://travis-ci.com/enbermudas/fail-express)
[![Coverage Status](https://coveralls.io/repos/github/enbermudas/fail-express/badge.svg?branch=master)](https://coveralls.io/github/enbermudas/fail-express?branch=master)

Fail-express is an express error-handler middleware for JSON APIs. This library uses [http-status](https://github.com/adaltas/node-http-status).

## Example

```js
const express = require('express');
const failExpress = require('fail-express');

const app = new express();
const router = express().Router();

router.get('/status', (req, res, next) => {
  res.send('Online!');
});

app.use('/api/v1', router);

router.use(failExpress());
```

## API

```js
const failExpress = require('fail-express');
```

### failExpress([options]);

Use the new fail-express middleware function using the given `options`.

### Options

fail-express accepts this properties in the options object.

##### errorReporter

Function that receives the error object with its default properties. Default fail-express error reporter:

```js
const defaultErrorReporter = error => {
  console.error(error.stack);
};
```

##### displayStackTrace

Appends the error stack trace to the error object.

##### exposeAdditionalProperties

Appends additional properties to the error object.

## Errors

Default properties:

- `message`
- `type`
- `name`
- `code`
- `status`

## License

[MIT](LICENSE)
