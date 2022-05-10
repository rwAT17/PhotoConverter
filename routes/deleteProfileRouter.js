const Profile = require('../src/Profiles')
const express = require('express')

const router = express.Router()

const deleteProfile = profileId => {
	Profile.find({ name: profileId })
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
