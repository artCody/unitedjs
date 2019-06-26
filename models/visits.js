const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const visitsSchema = new Schema({
	session: String,
	ip: String,
	browser: String,
	city: String,
	country: String,
	date: Object
}, {collection: 'visits',capped: { size: 6400, max: 50}});

const visits = mongoose.model('visits', visitsSchema);

module.exports = visits;