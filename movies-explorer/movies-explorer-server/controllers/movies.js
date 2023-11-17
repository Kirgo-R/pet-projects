const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants
const mongoose = require('mongoose')
const Movie = require('../models/movie')
const BadRequestError = require('../errors/BadRequestErrors')
const ForbiddenError = require('../errors/ForbiddenError')
const NotFoundError = require('../errors/NotFoundError')

module.exports.getMovies = (req, res, next) => {
	Movie.find({ owner: req.user._id })
		.then((cards) => res.status(HTTP_STATUS_OK).send(cards))
		.catch(next)
}

module.exports.addMovie = (req, res, next) => {
	const {
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		thumbnail,
		movieId,
		nameRU,
		nameEN,
	} = req.body
	Movie.create({
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		thumbnail,
		movieId,
		nameRU,
		nameEN,
		owner: req.user._id,
	})
		.then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
		.catch((err) => {
			if (err instanceof mongoose.Error.ValidationError) {
				next(new BadRequestError(err.message))
			} else {
				next(err)
			}
		})
}

module.exports.deleteMovie = (req, res, next) => {
	Movie.findById(req.params.movieId)
		.orFail()
		.then((movie) => {
			if (!movie.owner.equals(req.user._id)) {
				throw new ForbiddenError(
					'Вы не можете удалить фильм, созданный другим пользователем'
				)
			}
			Movie.deleteOne(movie)
				.orFail()
				.then(() => {
					res.status(HTTP_STATUS_OK).send({
						message: 'Фильм удален',
					})
				})
				.catch((err) => {
					if (err instanceof mongoose.Error.DocumentNotFoundError) {
						next(
							new NotFoundError(
								'Фильм с указанным _id не найдена'
							)
						)
					} else if (err instanceof mongoose.Error.CastError) {
						next(new BadRequestError('Некорректный _id фильма'))
					} else {
						next(err)
					}
				})
		})
		.catch((err) => {
			if (err instanceof mongoose.Error.DocumentNotFoundError) {
				next(new NotFoundError('Карточка с указанным _id не найдена'))
			} else {
				next(err)
			}
		})
}
