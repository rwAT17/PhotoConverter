const express = require('express')
const Profile = require('../src/Profiles')
const utils = require('../src/utils')
const router = express.Router()
let config = undefined

/////////////
//rendering//
/////////////
router.get('/', async (req, res, next) => {
	const url = req.originalUrl
	let originUrl = `${url}`
	let queryParam = req.query.page // only query like : ../pics
	// console.log(queryParam)
	let files
	/////// Localization
	const str = queryParam.split('/') // splits query every '/'
	let newArr = []
	let newObj = {}
	let objArr = []
	let localizatonName = []
	////////
	for (let i = 0; i < str.length; i++) {
		newArr.push(str[i])
		//console.log(newArr) // creating new arr with value from between every '/' #### [ '..', 'Pics', 'Dev pics' ]
		let urlString = newArr.join('/') // ../Pics/Dev pics
		localizatonName.splice(0, 1)
		localizatonName.push(str[i])
		newObj = { url: urlString, name: localizatonName.toString() }
		objArr.push(newObj)
	}
	////////
	// console.log(objArr);
	try {
		// console.log(profilesFind)
		const profilesFind = await Profile.find().lean()
		files = await utils.readDirStat(`${config.ROOT_DIR}/${queryParam}`) // reader function
		res.render('reader', {
			profiles: profilesFind,
			location: objArr,
			dirName: queryParam,
			url: originUrl, // req.originalUrl
			fileList: files,
			layout: 'readerLayout',
		})
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	let files = req.body.filesArr
	let dirName = req.body.dirName
	let profileName = req.body.profile
	// console.log(profileName)
	let findProfile = await Profile.findOne({ name: `${profileName}` })

	let size = findProfile.parameters.size
	let quality = findProfile.parameters.quality
	let waterMark = findProfile.parameters.waterMark
	let logo = findProfile.parameters.logo

	// console.log(size, quality, waterMark, logo)
	if (logo == 1) {
		logo = 'Logo'
	} else {
		logo = 'undefined'
	}

	if (waterMark == 1) {
		waterMark = 'waterMark'
	} else {
		waterMark = 'undefined'
	}

	try {
		// console.log(files)
		// console.log(typeof files)
		// if (typeof files === 'string') {
		// 	console.log('string')
		// } else {
		// 	console.log('arr')
		// }
		utils.resizer(files, dirName, config.ROOT_DIR, profileName, size, quality, waterMark, logo)

		res.redirect('back')
	} catch (err) {
		next(err)
	}
})

module.exports = _config => {
	config = _config
	return router
}
