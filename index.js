const fsp = require('fs/promises') /// module for reader function
const express = require('express') /// express modoules

const querystring = require('querystring')
const bodyParser = require('body-parser')

const path = require('path')

const app = express()
const port = 3000 // express port

const { engine } = require('express-handlebars')
const { readdir, rmSync } = require('fs')
const { ClientRequest } = require('http')

/// express app ///
app.use(bodyParser.json())

// app.use(express.static(__dirname + '/icons'))
app.use(express.static(__dirname + '/public'))
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

/// FUNCTIONS ///

// reading a directory then returning an array of objects with names and last edit time
// of files of each file in declared directory
const reader = async dir => {
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

// calling reader function and returning same list

const main = async dir => {
	let list = await reader(dir)
	// console.log(list)
	return list
}

/// test ///

/// express app ///
app.get('/', async (req, res) => {
	// console.log(port)
	// console.log('1xxxxxxxxxxxxxxx')
	// const fullUrl = `${protocol}://${host}:${port}${__dirname}`
	// console.log('fullurl', fullUrl)
	// console.log('2xxxxxxxxxxxxxxx')
	// console.log('Current directory:', __dirname)
	// let testDirName = path.basename(__dirname)
	// console.log(testDirName)
	// console.log('3xxxxxxxxxx')
	// const full = req.protocol + '://' + req.get('host') + req.originalUrl
	// console.log(full)
	// console.log(typeof full)
	// console.log('4xxxxxxxxxxxx')
	// console.log(req.originalUrl)
	// console.log(req.originalUrl)
	const protocol = req.protocol
	const host = req.hostname
	const url = req.originalUrl
	const urlPort = process.env.PORT


	let x = `${url}`
	// let x = `${protocol}://${host}:${urlPort}${originalUrl}`
	console.log(x);
    const strX = JSON.stringify(x)

	console.log(strX);


	let queryParam = req.query.page
	let files
	files = await main(`${queryParam}`)
	console.log(files)

	res.render('main', {fileList: files, layout: 'index' })
})

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`))

///// Scripts
rmSync
