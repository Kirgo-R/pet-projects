require('dotenv').config()
const express = require('express')
const { mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const { errors } = require('celebrate')
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { limiter } = require('./utils/constants')

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } =
	process.env

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

app.use(limiter)

mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

app.use(requestLogger)

app.use('/', routes)

app.use(errorLogger)

app.use(errors())

app.use(errorHandler)

app.listen(PORT)
