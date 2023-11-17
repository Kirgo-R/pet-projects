const { HTTP_STATUS_CONFLICT } = require('http2').constants;

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
};
