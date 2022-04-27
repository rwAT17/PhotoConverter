const express = require('express')
const app = express()

const router = express.Router()
const readerRouter = require('./readerRouter')
const utils = require('../src/utils')
const gm = require('gm')
const { path } = require('express/lib/application')

const resizer = (arr, outputDir) => {
	arr.forEach(file => {
		// console.log(`${config.ROOT_DIR}/${file}`)
		gm(`${config.ROOT_DIR}/${file}`)
			.resize(200, 200)
			.write('./converted' + '/resizes_' + file, function (err) {
				if (err) console.log(err)
			})
	})
}

let config = undefined

router.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let directories
	// console.log(originUrl)
	// console.log(`ROOT_DIR=${config.ROOT_DIR}`)
	directories = await utils.readDirStat(config.ROOT_DIR)
	// console.log('dirs: ', JSON.stringify(directories))
	// console.log(directories)
	res.render('main', { url: originUrl, directoryList: directories, layout: 'mainLayout' })
})

router.post('/', async (req, res, next) => {
	keys = Object.keys(req.body.value)
	resizer(keys)
})

module.exports = _config => {
	config = _config
	return router
}
