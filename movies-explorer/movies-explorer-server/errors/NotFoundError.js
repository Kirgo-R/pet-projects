const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
};
