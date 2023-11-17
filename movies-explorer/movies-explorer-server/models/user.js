const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailRegex } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator(email) {
          return emailRegex.test(email);
        },
        message: 'Неверный формат адреса электронной почты'
      }
    },
    password: {
      type: String,
      require: [true, 'Поле должно быть заполнено'],
      minLength: [3, 'Минимальная длина поля - 3 символа'],
      select: false
    },
    name: {
      type: String,
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов']

    }
  }, { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Почта или пароль введены неверно');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Почта или пароль введены неверно');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
