const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	name: String,
	parameters: {
		size: String,
		quality: String,
		waterMark: String,
		logo: String,
	}
})

module.exports = mongoose.model('testprofiles', profileSchema)
