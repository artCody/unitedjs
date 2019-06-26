var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// console.log(bcrypt);

const userDataSchema = new Schema({
	username: {type: String, index: true},
	email: String,
	password: String
}, {collection: 'userdata'});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;


module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.getUserByUsername = function(username,callback){
	var query = {username: username};
	UserData.findOne(query, callback);
}

module.exports.getUserById = function(id,callback){
	UserData.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword,hash,function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}
