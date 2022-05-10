const TestProfile = require('../src/Profiles')

const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const path = require('path')
const app = express()
const port = 3000 // express port
const methodOverride = require('method-override')

const router = express.Router()

const addProfile = async (name, size, quality, waterMark, logo) => {
	const profile = new TestProfile({
		name: `${name}`,
		parameters: {
			size: `${size}`,
			quality: `${quality}`,
			waterMark: `${waterMark}`,
			logo: `${logo}`,
		},
	})
	await profile.save()
	// console.log()
}

router.get('/', async (req, res, next) => {
	const profilesFind = await TestProfile.find().lean()
	// let testFind = await TestProfile.find({ name: '' })

	// console.log(profilesFind)
	res.render('addProfile', {
		profilesList: profilesFind,
		layout: 'addProfile',
	})
})

router.post('/', async (req, res, next) => {
	let name = req.body.name
	let size = req.body.size
	let quality = req.body.quality
	let waterMark = req.body.waterMark
	let logo = req.body.logo
	// console.log(name, size, quality, waterMark, logo)

	try {
		await addProfile(name, size, quality, waterMark, logo)
		console.log(`Added profile with name: ${name}`)
		console.log(name, size, quality, waterMark, logo)
		res.redirect('back')
	} catch (err) {
		next(err)
	}
})

// router.delete('/', async (req, res, next) => {
// 	test = req.body.parameters
// 	console.log(test)

// 	test.forEach(id => {
// 		deleteProfile(id)
// 		console.log(`deleted profile with id:${id}`)
// 	})

// 	res.redirect('back')
// })
module.exports = router
