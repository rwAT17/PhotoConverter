const TestProfile = require('../src/Profiles')
const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000 // express port
const router = express.Router()

const deleteProfile = profileId => {
	TestProfile.find({ name: profileId })
		.deleteOne({ name: profileId })
		.then(function () {
			console.log('Data deleted') // Success
		})
		.catch(function (err) {
			console.log(err) // Failure
		})
}

router.post('/', async (req, res, next) => {
	id = req.body.delete
	console.log(id)
	deleteProfile(id)
	console.log(`deleted profile with id:${id}`)
	res.redirect('back')
})

module.exports = router
