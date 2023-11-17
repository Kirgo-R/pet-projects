const mongoose = require('mongoose')
const { urlRegex } = require('../utils/constants')

const movieSchema = new mongoose.Schema(
	{
		country: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
		},
		director: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
		},
		duration: {
			type: Number,
			require: [true, 'Поле должно быть заполнено'],
		},
		year: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
		},
		description: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
		},
		image: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
			validate: {
				validator(url) {
					return urlRegex.test(url)
				},
				message: 'Неверный формат ссылки URL',
			},
		},
		trailerLink: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
			validate: {
				validator(url) {
					return urlRegex.test(url)
				},
				message: 'Неверный формат ссылки URL',
			},
		},
		thumbnail: {
			type: String,
			require: [true, 'Поле должно быть заполнено'],
			validate: {
				validator(url) {
					return urlRegex.test(url)
				},
				message: 'Неверный формат ссылки URL',
			},
		},
		movieId: {
			type: Number,
			require: true,
		},
		nameRU: {
			type: String,
			require: true,
		},
		nameEN: {
			type: String,
			require: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			ref: 'user',
		},
	},
	{ versionKey: false }
)

module.exports = mongoose.model('movie', movieSchema)
