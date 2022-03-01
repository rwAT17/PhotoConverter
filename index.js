const fsp = require('fs/promises') 
const express = require('express') 
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port
const { engine } = require('express-handlebars')
const { readdir, rmSync } = require('fs')
const { ClientRequest } = require('http')

app.use(bodyParser.json())
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

const imageMin = document.getElementById(imgMini)


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

const main = async dir => {
	let list = await reader(dir)
	// console.log(list)
	return list
}

/// express app ///
app.get('/', async (req, res) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	console.log(x);
  
	let queryParam = req.query.page
	let files
	files = await main(`${queryParam}`)
	console.log(files)

	res.render('main', { url: originUrl  ,fileList:  files, layout: 'index' }) /// nie wiem co wpisa w tym miejscu
})

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`))

///// Scripts
rmSync
