const urlRegex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\--._~:/?#[\]@!$&'()*+,;=]+#?$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { emailRegex, urlRegex, limiter };
