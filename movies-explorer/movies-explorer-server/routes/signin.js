const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const { login } = require('../controllers/users');
const { emailRegex } = require('../utils/constants');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailRegex),
      password: Joi.string().required().min(3)
    })
  }),
  login
);

module.exports = router;
