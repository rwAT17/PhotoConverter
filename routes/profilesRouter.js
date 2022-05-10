const Profile = require('../src/Profiles')
const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
	const profilesFind = await Profile.find().lean()
	// console.log(profilesFind)
	res.render('profiles', {
		profilesList: profilesFind,
		layout: 'profiles',
	})
})

module.exports = router
