const TestProfile = require('../src/Profiles')

const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const path = require('path')
const app = express()
const port = 3000 // express port
const methodOverride = require('method-override')

const router = express.Router()

const deleteProfile = profileId => {
	TestProfile.find({ _id: profileId })
		.deleteOne({ _id: profileId })
		.then(function () {
			console.log('Data deleted') // Success
		})
		.catch(function (err) {
			console.log(err) // Failure
		})
}
const addProfile = async (name, size, quality, waterMark, logo) => {
	const profile = new TestProfile({
		name: `${name}`,
		size: `${size}`,
		quality: `${quality}`,
		waterMark: `${waterMark}`,
		logo: `${logo}`,
	})
	await profile.save()
	// console.log()
}

router.get('/', async (req, res, next) => {
	const profilesFind = await TestProfile.find().lean()
	// console.log(profilesFind)
	res.render('addProfile', {
		profilesList: profilesFind,
		layout: 'mainLayout',
	})
})

router.post('/', async (req, res, next) => {
	let name = req.body.name
	let size = req.body.size
	let quality = req.body.quality
	let waterMark = req.body.waterMark
	let logo = req.body.logo
	console.log(name, size, quality, waterMark, logo)

	try {
		await addProfile(name, size, quality, waterMark, logo)
		// await addProfile(name)
		console.log(`Added profile with name: ${name}`)
		res.redirect('back')
	} catch (err) {
		next(err)
	}
})

router.delete('/', async (req, res, next) => {
	test = req.body.test
	console.log(test)

	test.forEach(id => {
		deleteProfile(id)
		console.log(`deleted profile with id:${id}`)
	})

	res.redirect('back')
})
module.exports = router
