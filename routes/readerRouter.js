const fsp = require('fs/promises')
const gm = require('gm')
const express = require('express')

const router = express.Router()

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

///

const main = async dir => {
	let list = await reader(dir)
	return list
}

/////////////
//rendering//
/////////////
router.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let queryParam = req.query.page // only query like : ../pics
	let files

	// Localization
	const str = queryParam.split('/') // splits query every '/'
	let newArr = []
	let newObj = {}
	let objArr = []
	let localizatonName = []

	for (let i = 0; i < str.length; i++) {
		newArr.push(str[i])
		//console.log(newArr) // creating new arr with value from between every '/' #### [ '..', 'Pics', 'Dev pics' ]
		let urlString = newArr.join('/') // ../Pics/Dev pics
		localizatonName.splice(0, 1)
		localizatonName.push(str[i])

		newObj = { url: urlString, name: localizatonName.toString() }
		objArr.push(newObj)
	}
	////
	

	////

	try {
		files = await main(`${queryParam}`) // reader function
		res.render('reader', {
			location: objArr,
			dirName: queryParam,
			url: originUrl, // req.originalUrl
			fileList: files,
			layout: 'readerLayout',
		})
		console.log(req.query.page)
	} catch (err) {
		next(err)
	}
})

module.exports = router
