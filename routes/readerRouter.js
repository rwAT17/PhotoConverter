const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port

const router = express.Router()

const reader = async dir => {
	// reading a directory then returning an array of objects with names and last edit time
	// of files of each file in declared directory
	return fsp.readdir(dir).then(files => {
		let returnedArr = files.map(async file => {
			let stat = await fsp.stat(`${dir}/${file}`)
			// console.log(file);
			// console.log(path.dirname);

			return {
				// test: dupa,
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
	let files

	const str = queryParam.split('/')
	let newArr = []
	let newObj = {}
	let objArr = []
	let localizatonName = []

	for (let i = 0; i < str.length; i++) {
		newArr.push(str[i])
		let urlString = newArr.join('/')
		///name
		localizatonName.splice(0, 1)
		localizatonName.push(str[i])

		newObj = { url: urlString, name: localizatonName.toString() }
		objArr.push(newObj)
	}

	try {
		files = await main(`${queryParam}`)
		res.render('reader', {
			location: objArr,
			dirName: queryParam,
			url: originUrl,
			fileList: files,
			layout: 'index',
		})
		// console.log(files)

		// console.log(test);
	} catch (err) {
		next(err)
	}

	// console.log(req.query.page)
})

module.exports = router
