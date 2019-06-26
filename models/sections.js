const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const sectionSchema = new Schema({
	status: String,
	type: String,
	position: Number,
	img: String,
	imgTwo: String,
	title: String,
	size: String,
	extra: String,
	textarea: String,
	previewtext: String,
	cards: [{
		id: String,
		headline: String,
		text: String,
		img: {
			name: String,
			status: Boolean,
			path: String
		}
	}],
	images: Array

}, {collection: 'sections'});

const sections = mongoose.model('sections', sectionSchema);

module.exports = sections;