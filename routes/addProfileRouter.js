const TestProfile = require('../src/Profiles')

const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const path = require('path')
const app = express()
const port = 3000 // express port

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
const addProfile = async size => {
	const profile = new TestProfile({ size: `${size}` })
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

router.delete('/', async (req, res, next) => {
	test = req.body.profileID

	try {
		test.forEach(id => {
			deleteProfile(id)
			console.log(`deleted profile with id:${id}`)
		})
		// console.log(test);
		res.redirect('back')
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	size = req.body.size

	try {
		await addProfile(size)
		console.log(`Added profile with size: ${size}`);
		res.redirect('back')
	} catch (err) {
		next(err)
	}
})

module.exports = router
