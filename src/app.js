// To start type - npm run dev

const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const events = require('events')
const gm = require('gm')

const app = express()
const port = 3000
const { engine } = require('express-handlebars')

const ROOT_DIR = process.env.ROOT_DIR || process.env.HOME + '/Pictures';

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.engine(
	'hbs',
	engine({
		layoutsDir: __dirname + '/views/layouts',
		extname: 'hbs',
		defaultLayout: 'planB',
		partialsDir: __dirname + '/views/partials/',
	})
)

app.use(express.json()) // for json // added instead of body parser
app.use(express.urlencoded({ extended: false })) // added instead of body parser
app.use(express.static('public'))

app.use('/assets', express.static(path.join(__dirname, '../public')))
const config = {
    ROOT_DIR: ROOT_DIR
}
const readerRouter = require('../routes/readerRouter')(config)
const mainPageRouter = require('../routes/mainPageRouter')(config)
const profilesRouter = require('../routes/profilesRouter')
const addProfilesRouter = require('../routes/addProfileRouter')
const processRouter = express.Router()

processRouter.post('/', async (req, res, next) => {
	const test =(req.body) 
	console.log( Object.keys(test))
	res.send( Object.keys(test))
})

app.use('/', mainPageRouter)
app.use('/reader', readerRouter)
app.use('/profiles', profilesRouter)
app.use('/addProfile', addProfilesRouter)
app.use('/processImages', processRouter)

app.use('/', function (err, req, res, next) {
	console.log(req.originalUrl)

	res.render('error', { layout: 'error' })
})
app.listen(port, () => console.log(`App listening to port ${port}`))
