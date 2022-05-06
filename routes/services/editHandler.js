const TestProfile = require('../../src/Profiles')
const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const res = require('express/lib/response')
const { Module } = require('module')
const app = express()
const port = 3000 // express port

const router = express.Router()
const newProfile = async (oldName, newName, newSize, newQuality, newWaterMark, newLogo) => {
	await TestProfile.findOneAndUpdate(
		{ name: `${oldName}` },
		{
			name: `${newName}`,
			parameters: {
				size: `${newSize}`,
				quality: `${newQuality}`,
				waterMark: `${newWaterMark}`,
				logo: `${newLogo}`,
			},
		}
	)
}

router.post('/', async (req, res, next) => {
	let oldName = req.body.oldName
	let newName = req.body.newName
	let size = req.body.newSize
	let quality = req.body.newQuality
	let waterMark = req.body.newWaterMark
	let logo = req.body.newLogo
	// console.log(name, size, quality, waterMark, logo)

	try {
		await newProfile(oldName, newName, size, quality, waterMark, logo)

		res.redirect('/')
	} catch (err) {
		next(err)
	}
})

module.exports = router
