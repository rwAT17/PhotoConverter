const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	size: String,
})

module.exports = mongoose.model('testprofiles', profileSchema)
