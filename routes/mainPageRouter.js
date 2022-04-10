const express = require('express')
const app = express()

const router = express.Router()
const readerRouter = require('./readerRouter')
const utils = require('../src/utils')

let config = undefined;

router.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let directories

	console.log(`ROOT_DIR=${config.ROOT_DIR}`);
	directories = await utils.readDirStat(config.ROOT_DIR)
	console.log("dirs: ", JSON.stringify(directories));
	res.render('main', { url: originUrl, directoryList: directories, layout: 'mainLayout' })
})

module.exports = (_config) => {
	config = _config;
	return router;
}

