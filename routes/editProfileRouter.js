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
	let test = await TestProfile.findOne({ name: `${profileName}` })
	console.log(test)
	// res.redirect('/editProfile')
	res.render('editProfile', {
		oldParameters: {
			name: test.name,
			parameters: {
				size: test.parameters.size,
				quality: test.parameters.quality,
				waterMark: test.parameters.waterMark,
				logo: test.parameters.logo,
			},
		},
		layout: 'addProfile',
	})
})

module.exports = router
