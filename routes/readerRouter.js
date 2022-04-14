const fsp = require('fs/promises')
const gm = require('gm')
const express = require('express')
const utils = require('../src/utils')
const router = express.Router()
let config = undefined

const reader = async dir => {
	// reading a directory then returning an array of objects with names and last edit time
	// of files of each file in declared directory
	return fsp.readdir(`${config.ROOT_DIR}/${dir}`).then(files => {
		let returnedArr = files.map(async file => {
			// console.log(`file: ${config.ROOT_DIR}/${dir}/${file}`)
			let stat = await fsp.stat(`${config.ROOT_DIR}/${dir}/${file}`)
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
	return reader(dir)
}

/////////////
//rendering//
/////////////
router.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let queryParam = req.query.page // only query like : ../pics
	console.log(queryParam)
	let files
	/////// Localization
	const str = queryParam.split('/') // splits query every '/'
	let newArr = []
	let newObj = {}
	let objArr = []
	let localizatonName = []
	////////
	for (let i = 0; i < str.length; i++) {
		newArr.push(str[i])
		//console.log(newArr) // creating new arr with value from between every '/' #### [ '..', 'Pics', 'Dev pics' ]
		let urlString = newArr.join('/') // ../Pics/Dev pics
		localizatonName.splice(0, 1)
		localizatonName.push(str[i])
		newObj = { url: urlString, name: localizatonName.toString() }
		objArr.push(newObj)
	}
	////////
	try {
		files = await utils.readDirStat(`${config.ROOT_DIR}/${queryParam}`) // reader function
		res.render('reader', {
			location: objArr,
			dirName: queryParam,
			url: originUrl, // req.originalUrl
			fileList: files,
			layout: 'readerLayout',
		})
		// console.log(req.query.page)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	let keys = Object.keys(req.body)
	let queryParam = req.query.page // only query like : ../pics
	console.log(queryParam)
	// console.log(keys)
	utils.resizer(keys, config.ROOT_DIR, queryParam)
})

module.exports = _config => {
	config = _config
	return router
}
