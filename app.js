// To start type - npm run dev

const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const path = require('path')
const events = require('events')
const gm = require('gm')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()
const port = 3000
const expressHbs = require('express-handlebars')
const { engine } = require('express-handlebars')

const ROOT_DIR = process.env.ROOT_DIR || process.env.HOME + '/'

mongoose.connect('mongodb://mongo_db/newDB', () => {
	console.log('connected')
})

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname + '/src/', 'views'))
app.engine(
	'hbs',
	engine({
		layoutsDir: __dirname + '/src/views/layouts/',
		extname: 'hbs',
		defaultLayout: 'planB',
		partialsDir: __dirname + '/src/views/partials/',
	})
)
// import(`./public`)
app.use(express.json()) // for json // added instead of body parser
app.use(express.urlencoded({ extended: true })) // added instead of body parser
app.use(express.static(path.join(__dirname, '/public')))
app.use('/assets', express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method')) // to use DELETE and PUT mothods

const config = {
	ROOT_DIR: ROOT_DIR,
	
}

const readerRouter = require('./routes/readerRouter')(config)
const mainPageRouter = require('./routes/mainPageRouter')(config)
const profilesRouter = require('./routes/profilesRouter')
const addProfilesRouter = require('./routes/addProfileRouter')
const deleteProfilesRouter = require('./routes/deleteProfileRouter')
const editProfilesRouter = require('./routes/editProfileRouter')
const editHandler = require('./routes/services/editHandler')
const allProfilesHandler = require('./routes/services/allProfilesHandler')(config)

var hbs = expressHbs.create({})

// if ==  hbs helper

hbs.handlebars.registerHelper('if_eq', function (a, b, opts) {
	if (a == b) {
		return opts.fn(this)
	} else {
		return opts.inverse(this)
	}
})
// register new function

app.use('/', mainPageRouter)
app.use('/reader', readerRouter)
app.use('/profiles', profilesRouter)
app.use('/addProfile', addProfilesRouter)
app.use('/deleteProfile', deleteProfilesRouter)
app.use('/editProfile', editProfilesRouter)
app.use('/editHandler', editHandler)
app.use('/allProfilesHandler', allProfilesHandler)

// engine.registerHelper('if_eq', function (a, b, opts) {
// 	if (a == b) {
// 		return opts.fn(this)
// 	} else {
// 		return opts.inverse(this)
// 	}
// })

app.use('/', function (err, req, res, next) {
	res.render('error', { layout: 'error' })
})
app.listen(port, () => console.log(`App listening to port ${port}`))
