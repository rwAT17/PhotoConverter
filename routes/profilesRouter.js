const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port

const router = express.Router()

router.get('/', async (req, res, next) => {
	res.send('profiles')
})

module.exports = router
