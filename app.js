const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port
const { engine } = require('express-handlebars')

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
app.use(bodyParser.json())
app.use(express.static('public'))

const readerRouter = require('./routes/readerRouter')
const mainPageRouter = require('./routes/mainPageRouter')

app.use('/main', mainPageRouter)
app.use('/reader', readerRouter)

app.use('/', function (err, req, res, next) {
	console.log(req.originalUrl)
	// console.log('error1')
	// res.sendStatus(err)
	res.render('error', { layout: 'index' })
})

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`))

///// Scripts
