const TestProfile = require('../src/Profiles')
const fsp = require('fs/promises')
const express = require('express')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const res = require('express/lib/response')
const app = express()
const port = 3000 // express port

const router = express.Router()

// router.get('/', async (req, res, next) => {
// 	console.log('dupa');
// 	const profilesFind = await TestProfile.find().lean()
// 	let testFind = await TestProfile.find({ name: 'dupa' })

// 	// console.log(profilesFind)
// 	res.render('addProfile', {
// 		// profilesList: profilesFind,
// 		layout: 'addProfile',
// 	})
// })

router.post('/', async (req, res, next) => {
	let profileName = req.body.edit
	// let profileId = req.body.profileId
	let profile = await TestProfile.findOne({ _id: `${profileName}` })
	console.log(profile)
	// res.redirect('/editProfile')
	res.render('editProfile', {
		oldParameters: {
			profileId: profile.id,
			name: profile.name,
			parameters: {
				size: profile.parameters.size,
				quality: profile.parameters.quality,
				waterMark: profile.parameters.waterMark,
				logo: profile.parameters.logo,
			},
		},
		layout: 'addProfile',
	})
})

module.exports = router
