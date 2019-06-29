# fail-express
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

router.use(failExpress());

app.use('/api/v1', router);
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
