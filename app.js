// To start type - npm run dev

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 9000

const ROOT_DIR = process.env.ROOT_DIR || process.env.HOME + '/'

mongoose.connect('mongodb://mongo_db/newDB', () => {
	console.log('connected')
})

// import(`./public`)
app.use(express.json()) // for json // added instead of body parser
app.use(express.urlencoded({ extended: true })) // added instead of body parser
// app.use(express.static(path.join(__dirname, '/public')))
// app.use('/assets', express.static(path.join(__dirname, '/public')))

// const config = {
// 	ROOT_DIR: ROOT_DIR,
// }

// const readerRouter = require('./routes/readerRouter')(config)
// const mainPageRouter = require('./routes/mainPageRouter')(config)
// const profilesRouter = require('./routes/profilesRouter')
// const addProfilesRouter = require('./routes/addProfileRouter')
// const deleteProfilesRouter = require('./routes/deleteProfileRouter')
// const editProfilesRouter = require('./routes/editProfileRouter')
// const editHandler = require('./routes/services/editHandler')
// const allProfilesHandler = require('./routes/services/allProfilesHandler')(config)

app.get('/', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
})

// app.use('/', mainPageRouter)
// app.use('/reader', readerRouter)
// app.use('/profiles', profilesRouter)
// app.use('/addProfile', addProfilesRouter)
// app.use('/deleteProfile', deleteProfilesRouter)
// app.use('/editProfile', editProfilesRouter)
// app.use('/editHandler', editHandler)
// app.use('/allProfilesHandler', allProfilesHandler)

// engine.registerHelper('if_eq', function (a, b, opts) {
// 	if (a == b) {
// 		return opts.fn(this)
// 	} else {
// 		return opts.inverse(this)
// 	}
// })

// app.use('/', function (err, req, res, next) {
// 	res.render('error', { layout: 'error' })
// })
app.listen(port, () => console.log(`App listening to port ${port}`))
