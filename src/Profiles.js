const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	name: String,
	isActive: String,
	parameters: {
		size: String,
		quality: String,
		waterMark: String,
		logo: String,
	},
})

const test = new mongoose.Schema({
	test: String,
})

module.exports = mongoose.model('testprofiles', profileSchema)
module.exports = mongoose.model('test', test)
