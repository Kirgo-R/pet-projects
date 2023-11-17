const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { emailRegex } = require('../utils/constants')

const { editUser, getMeUser, addUser } = require('../controllers/users')

router.get('/me', getMeUser)

router.patch(
	'/me',
	celebrate({
		body: Joi.object().keys({
			email: Joi.string().required().pattern(emailRegex),
			name: Joi.string().min(2).max(30),
		}),
	}),
	editUser
)

router.post(
	'/',
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().min(2).max(30),
			email: Joi.string().required().pattern(emailRegex),
			password: Joi.string().required().min(3),
		}),
	}),
	addUser
)

module.exports = router
