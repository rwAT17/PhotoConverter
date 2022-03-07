const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port
const { engine } = require('express-handlebars')

app.set('view engine', 'hbs')
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
app.use(express.static(__dirname + '/public'))

// error handler middleware

////////
const reader = async dir => {
	// reading a directory then returning an array of objects with names and last edit time
	// of files of each file in declared directory
	return fsp.readdir(dir).then(files => {
		let returnedArr = files.map(async file => {
			let stat = await fsp.stat(`${dir}/${file}`)

			return {
				name: file,
				time: stat.mtime.toDateString(),
				size: stat.size,
				isFile: stat.isFile(),
				isDirectory: stat.isDirectory(),
			}
		})
		return Promise.all(returnedArr)
	})
}
const main = async dir => {
	let list = await reader(dir)
	// console.log(list)
	return list
}

// express app ///
app.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let queryParam = req.query.page
	let files

	try {
		files = await main(`${queryParam}`)
		res.render('main', { url: originUrl, fileList: files, layout: 'index' })
	} catch (err) {
		next(err)
		console.log(typeof next);
	}
})
//
app.use((err, req, res, next) => {
	console.log('error1')
	res.send(err)
	res.render('error')
})

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`))

///// Scripts
