const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const followersSchema = new Schema({
	status: Boolean,
	name: String,
	email: String,
	phone: String

}, {collection: 'followers'});

const followers = mongoose.model('followers', followersSchema);

module.exports = followers;