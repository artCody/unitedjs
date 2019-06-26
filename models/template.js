const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const templateSchema = new Schema({
	_id: String,
	title: String,
	templates: Object,
	logo: String,
	back: String,
	maintext: String,
	extratext: String,
	font: String,
	file: String,
	phone: String,
	bgOverlay: Object,
	seo: Object,
	instagram: String,
	twitter: String,
	telegram: String,
	copyright: String
}, {collection: 'template'});

const template = mongoose.model('template', templateSchema);

module.exports = template;