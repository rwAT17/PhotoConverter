const express = require('express')
const Profile = require('../../src/Profiles')
const gm = require('gm')
const fsp = require('fs/promises')
const router = express.Router()
let config = undefined

const convertAll = async (files, dirName, rootDir) => {
	let activeProfiles = await Profile.find({
		isActive: '1',
	})

	async function exists(path) {
		try {
			await fsp.access(path)
			return true
		} catch {
			return false
		}
	}

	if (typeof files === 'object') {
		activeProfiles.forEach(async profile => {
			if ((await exists(`${rootDir}/${dirName}${profile.name}`)) === true) {
				return
			}
			console.log(`${rootDir}/${dirName}${profile.name}`);

			await fsp.mkdir(`${rootDir}/${dirName}${profile.name}`, err => {
				if (err) throw err
			})

			files.forEach(test => {
				// console.log(test)
				// console.log(`${rootDir}${dirName}${profile.name}/` + test)
				// console.log(`${rootDir}/${dirName}${test}`)
				// console.log(`${rootDir}/${dirName}${profile.name}/` + test)

				gm(`${rootDir}/${dirName}${test}`)
					.resize(profile.parameters.size)
					.quality(profile.parameters.quality)
					.fill('#fd01fe')
					.font('AvantGarde-Demi')
					.drawText(profile.parameters.size * 0.1, profile.parameters.size * 0.1, profile.parameters.logo)
					.fontSize(profile.parameters.size * 0.05)
					// .composite('../public/waterMarks/watermark.png') // composes two images
					.write(`${rootDir}/${dirName}${profile.name}/` + test, function (err) {
						if (err) console.log(err)
					})
			})
		})
	} else {
		activeProfiles.forEach(async profile => {
			if ((await exists(`${rootDir}/${dirName}${profile.name}`)) === true) {
				return
			}

			let newDir = await fsp.mkdir(`${rootDir}/${dirName}${profile.name}`, err => {
				if (err) throw err
			})

			// console.log(test)
			// console.log(`${rootDir}${dirName}${profile.name}/` + test)
			// console.log(`${rootDir}${dirName}${test}`)
			// console.log(`${rootDir}${dirName}${profile.name}/` + test)

			gm(`${rootDir}/${dirName}${files}`)
				.resize(profile.parameters.size)
				.quality(profile.parameters.quality)
				.fill('#fd01fe')
				.font('AvantGarde-Demi')
				.drawText(profile.parameters.size * 0.1, profile.parameters.size * 0.1, profile.parameters.logo)
				.fontSize(profile.parameters.size * 0.05)
				// .composite('../public/waterMarks/watermark.png') // composes two images
				.write(`${rootDir}/${dirName}${profile.name}/` + files, function (err) {
					if (err) console.log(err)
				})
		})
	}
}

router.post('/', async (req, res, next) => {
	let files = req.body.filesArr
	let dirName = req.body.dirName

	try {
		// console.log(files)
		// console.log(dirName)
		// const profilesFind = await Profile.find({
		// 	isActive: '1',
		// })
		// profilesFind.forEach(profile => {
		// 	console.log(profile.name)
		// })
		convertAll(files, dirName, config.ROOT_DIR)
		res.redirect('back')
	} catch (err) {
		next(err)
	}
})

module.exports = _config => {
	config = _config
	return router
}
