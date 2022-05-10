const Profile = require('../../src/Profiles')
const express = require('express')

const router = express.Router()

const editProfile = async (profileId, newName, newSize, newQuality, newWaterMark, newLogo) => {
	await Profile.findOneAndUpdate(
		{ _id: `${profileId}` },
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
	let profileId = req.body.profileId
	let newName = req.body.newName
	let size = req.body.newSize
	let quality = req.body.newQuality
	let waterMark = req.body.newWaterMark
	let logo = req.body.newLogo
	// console.log(name, size, quality, waterMark, logo)
	// console.log(profileId)

	try {
		await editProfile(profileId, newName, size, quality, waterMark, logo)

		res.redirect('/profiles')
	} catch (err) {
		next(err)
	}
})

module.exports = router
