const winston = require('winston');
const expressWInston = require('express-winston');

const requestLogger = expressWInston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json()
});

const errorLogger = expressWInston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json()
});

module.exports = {
  requestLogger,
  errorLogger
};
