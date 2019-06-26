const UserData = require('../../models/user.js');
const sections = require('../../models/sections.js');
const formidable = require('formidable');
const visits = require('../../models/visits.js');
const followers = require('../../models/followers.js');
const template = require('../../models/template.js');


var index = require("../../index.js");
const fs = require('fs');


const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const Promise = require('bluebird');

exports.utd = function(req,res) {
	if(req.isAuthenticated()) {
		res.redirect('/dashboard');
	} else {
		// system check user have or don't have
		var newUser = new UserData({
			username: 'john',
			password: 12345,
			email: ''
		});
		UserData.find({}, function(err, data){
			if(data.length == 0){
				UserData.createUser(newUser);
			}
		});
		res.render('united/utd', {layout: false, local: lang()} );
	}
}

function format(seconds){
	function pad(s){
	  return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60*60));
	var minutes = Math.floor(seconds % (60*60) / 60);
	var seconds = Math.floor(seconds % 60);
  
	return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function lang(){
	let getLangName = fs.readFileSync('config.json');
	let langName = JSON.parse(getLangName).lang;
	let path = 'locals/' + langName + '.json';
	let getData = fs.readFileSync(path);
	return JSON.parse(getData);
}

exports.dashboard = async function(req,res) {

	var uptime = process.uptime();

	let countSections = await sections.find({});
	let countVisits = await visits.find({});
	let activeSections = await sections.find({status: 'on'});

	res.render('united/dashboard', { local: lang(), active: {dashboard: true }, count: countSections.length, activeSections: activeSections.length, visits: countVisits.length });
}


exports.choose = function(req,res){
	res.render('united/choose', { local: lang(), active: {choose: true }});
}


exports.sections = function(req,res) {
	
	sections.find().sort({position: 1}).then(function(doc) {
		res.render('united/sections', {items: doc, local: lang(), active: {sections: true }});
	});
}

exports.settings = function(req,res){
	UserData.find({}, function(err, data){
		res.render('united/settings', {link: req.params.param,user: data[0], local: lang(), active: {settings: true }});
	});
}

exports.changeLanguage = async function(req,res){

	let getLangName = fs.readFileSync('config.json');
	let langName = JSON.parse(getLangName);

	langName.lang = req.body.id;

	await fs.writeFile('config.json',JSON.stringify(langName, null, 2), function (err) {
		if (err) {
		  console.log(err);
		} else {
			res.send({redirect: '/settings/lang'});
		}
	});
	
}


exports.updateSecurity = function(req,res){
	const form = new formidable.IncomingForm();

	form.parse(req, function(err,fields, files) {

		function passMathes() {
			if(fields.newpassword == fields.confpassword && (fields.newpassword && fields.newpassword) != "") {
				return true;
			} else {
				return false;
			}
		}

		UserData.find({}, function(err, data){
			if((fields.username == data[0].username) && passMathes()) {
				UserData.findOneAndRemove({}).exec();
				var newUser = new UserData({
					username: data[0].username,
					password: fields.newpassword
				});
				UserData.createUser(newUser);
				res.send({redirect: '/utd'});
			} else if(fields.username != data[0].username && fields.newpassword == ""){
				data[0].username = fields.username;
				data[0].save();
			} else if((fields.username != data[0].username) && passMathes()){
				UserData.findOneAndRemove({}).exec();
				var newUser = new UserData({
					username: fields.username,
					password: fields.newpassword
				});
				UserData.createUser(newUser);
				res.send({redirect: '/utd'});
			} else if (fields.email != data[0].email){
				console.log('email changed');
				data[0].email = fields.email;
				data[0].save();
			}
		});


	});

}

exports.getLang = function(req,res){
	let data = fs.readFileSync('config.json');
	let passLang = JSON.parse(data).lang;
	res.send(passLang);
}


exports.login = function(req,res){
	res.redirect('/dashboard')
}

exports.logout = function(req,res){
	req.logout();
	res.redirect('/utd');
}


exports.visitors = function(req,res){

	const visitor = visits.find({}).execAsync();

	Promise.props({
		visits: visitor
	}).then(function(results){
		res.render('united/visitors', {local: lang(), visitors: results.visits});
	});
	
}


exports.followers = function(req,res){

	const follower = followers.find({}).execAsync();
	const user = UserData.find({}).execAsync();
	const templateSettings = template.findById({_id: 'united'}).execAsync();

	Promise.props({
		followers: follower,
		user: user,
		template: templateSettings
	}).then(function(results){
		console.log(results.template)
		res.render('united/followers', {email: results.user[0].email,local: lang(), followers: results.followers, settings: results.template, active: {followers: true }, name: results.user[0].username});
	});

}


exports.changeFollower = function(req,res){
	followers.find({_id: req.body.id}, function(err, data){
		data[0].status = !data[0].status;
		data[0].save();
		res.sendStatus(200);
	});
	
}


exports.deleteFollower = function(req,res){
	followers.findByIdAndRemove(req.body.id).exec();
	res.send({msg: 'done'})
}

exports.statistic = function(req,res){
	const visitor = visits.find({country: {$ne: "unknown" }}).execAsync();
	Promise.props({
		visits: visitor
	}).then(function(results){
		res.send({visitors: results.visits});
	});
}




exports.email = function(req,res){
	let users = UserData.find({}).execAsync();
	let follower = followers.find({}).execAsync();
	const templateSettings = template.findById({_id: 'united'}).execAsync();
	Promise.props({
		user: users,
		followers: follower,
		template: templateSettings
	}).then(function(results){

		let emalisFollowers = [];

		
		results.followers.forEach((item)=>{
			if(item.status){
				emalisFollowers.push(item.email);
			}
		})

	

		let transporter = nodemailer.createTransport({
			host: `smtp.${results.user[0].email.split('@')[1]}`,
			port: 587,
			secure: false,
			auth: {
				user: results.user[0].email,
				pass: req.body.emailpass
			},
			tls: {
				rejectUnauthorized: false
			}
		})

		const handlebarOptions = {
		  viewEngine: {
		    extName: '.handlebars',
		    partialsDir: 'views/email/',
		    layoutsDir: 'views/email/',
		    defaultLayout: 'email',
		  },
		  viewPath: 'views/email/',
		  extName: '.handlebars',
		};

	transporter.use('compile', hbs(handlebarOptions));
		// transporter.use('compile', hbs({
		// 	viewEngine: 'express-handlebars',
		// 	viewPath: 'views/email/'
		// }))

		
		for(var i = 0; i < emalisFollowers.length; i++){
			let mailOptions = {
				from: `${results.user[0].username} <${results.user[0].email}>`,
				to: emalisFollowers[i],
				subject: req.body.title,
				text: 'something text',
				template: 'email',
				context: {
					title: results.template.title,
					variable: req.body.textarea,
					phone: results.template.phone,
					copyright: results.template.copyright,
					background: results.template.back,
					bgOverlay: results.template.bgOverlay
				}
			}

			transporter.sendMail(mailOptions, (error, info)=>{
				if(error) return console.log(error);

					console.log('Message sent: ' + info.messageId);

			})
		}


		res.send({redirect: '/followers'});
	});

}