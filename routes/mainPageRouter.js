const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port

const router = express.Router()
const readerRouter = require('./readerRouter')

app.use('/reader', readerRouter)
// router.get('/', async (req, res, next) => {
// 	res.render('main', { layout: 'mainLayout' })
// })

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

router.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let queryParam = req.query.page
	let directories

	directories = await main(`../`)
	res.render('main', { url: originUrl, directoryList: directories, layout: 'mainLayout' })

	// res.render('main', { isDirectory:
	// 	layout: 'mainLayout',
	// })
})

module.exports = router
