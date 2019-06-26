// const express = require('express');
// const formidable = require('formidable');
// const mongoose = require('mongoose');
// const UserData = require('../../models/user.js');
// const sections = require('../../models/sections.js');
// const template = require('../../models/template.js');
// const passport = require('passport');

// const Promise = require('bluebird');
// Promise.promisifyAll(mongoose);

// const firstSettings = template.find({}).execAsync();


// const fs = require('fs');

// var index = require("../../index.js");

// exports.utd = function(req,res) {
// 	if(req.isAuthenticated()) {
// 		res.redirect('/dashboard');
// 	} else {
// 		// system check user have or don't have
// 		var newUser = new UserData({
// 			username: 'john',
// 			password: 12345
// 		});
// 		UserData.find({}, function(err, data){
// 			if(data.length == 0){
// 				UserData.createUser(newUser);
// 			}
// 		});
// 		res.render('united/utd', {layout: false} );
// 	}
// }

// var os = require('os');


// function format(seconds){
// 	function pad(s){
// 	  return (s < 10 ? '0' : '') + s;
// 	}
// 	var hours = Math.floor(seconds / (60*60));
// 	var minutes = Math.floor(seconds % (60*60) / 60);
// 	var seconds = Math.floor(seconds % 60);
  
// 	return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
//   }



// exports.dashboard = function(req,res) {
// 	console.log(process.memoryUsage());
// 	var uptime = process.uptime();
// 	console.log('server worked: ' + format(uptime));
// 	console.log('memory usage ' + (Math.floor((process.memoryUsage().heapTotal)/1000000)) + 'MB');
	

// 	console.log('Operating system: '  + os.platform());

// 	index.updateTemplate();
// 	res.render('united/dashboard', { local: lang()});
// }

// exports.choose = function(req,res){
// 	res.render('united/choose', { local: lang()});
// }

// exports.classic = function(req,res){
// 	res.render('united/classic', { local: lang()});
// }

// exports.person = function(req,res){
// 	res.render('united/person', { local: lang()});
// }

// exports.wide = function(req,res){
// 	res.render('united/wide', { local: lang()});
// }

// exports.features = function(req,res){
// 	res.render('united/features', { local: lang()});
// }

// exports.sandbox = function(req,res){
// 	res.render('united/sandbox', { local: lang()});
// }

// exports.sections = function(req,res) {
// 	sections.find().then(function(doc) {
// 		res.render('united/sections', {items: doc, local: lang()});
// 	});
// }

//  function lang(){
// 	let getLangName = fs.readFileSync('config.json');
// 	let langName = JSON.parse(getLangName).lang;
// 	let path = 'locals/' + langName + '.json';
// 	let getData = fs.readFileSync(path);
// 	return JSON.parse(getData);
// }



// exports.createClassic = function(req,res){

// 	const form = new formidable.IncomingForm();
// 	var path;

// 	form.on('fileBegin' , function(name, file){
// 		if( file.name == '') {
// 			console.log('You dont upload file');
// 		} else {
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}
// 	});

// 	form.on('file', function(name, file) {
// 		console.log('Uploaded: ' + file.name);
// 	})

// 	form.parse(req, function(err,fields, files) {

// 		function getStatus(){
// 			if(fields.display == undefined) {
// 				return fields.display = "off";
// 			} else {
// 				return fields.display;
// 			}
// 		}
// 		console.log(fields.size);
// 		const section = {
// 			status: getStatus(),
// 			type: fields.type,
// 			position: parseInt(fields.position),
// 			img: path,
// 			title: fields.title,
// 			size: fields.size,
// 			textarea: fields.textarea,
// 			previewtext: fields.textarea.substr(0, 60) + "..."
// 		}

// 		var data = new sections(section);
// 		data.save();

// 	});

// 	res.send({redirect: '/sections'});

// }


// exports.createPerson = function(req,res){
// 	const form = new formidable.IncomingForm();
// 	var path;

// 	form.on('fileBegin' , function(name, file){
// 		console.log('file path : ' + file.path);
// 		if( file.name == '') {
// 			console.log('You dont upload file');
// 		} else {
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}


// 	});

// 	form.on('file', function(name, file) {
// 		if(file) {
// 			console.log('Uploaded: ' + file.name);
// 		} else {
// 			console.log('error');
// 		}
// 	})

// 	form.parse(req, function(err,fields, files) {

// 		function getStatus(){
// 			if(fields.display == undefined) {
// 				return fields.display = "off";
// 			} else {
// 				return fields.display;
// 			}
// 		}

// 		const section = {
// 			status: getStatus(),
// 			type: fields.type,
// 			position: parseInt(fields.position),
// 			img: path,
// 			title: fields.title,
// 			size: fields.size,
// 			extra: fields.extra,
// 			textarea: fields.textarea,
// 			previewtext: fields.textarea.substr(0, 60) + "..."
// 		}
// 		var data = new sections(section);
// 		data.save();
// 	});
// 	res.send({redirect: '/sections'});
// }

// exports.createWide = function(req,res){
// 	const form = new formidable.IncomingForm();
// 	var path;

// 	form.on('fileBegin' , function(name, file){

// 		if( file.name == '') {
// 			console.log('You dont upload file');
// 		} else {
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}
// 	});

// 	form.on('file', function(name, file) {

// 	})

// 	form.parse(req, function(err,fields, files) {

// 		console.log(files);
// 		function getStatus(){
// 			if(fields.display == undefined) {
// 				return fields.display = "off";
// 			} else {
// 				return fields.display;
// 			}
// 		}

// 		const section = {
// 			status: getStatus(),
// 			type: fields.type,
// 			position: parseInt(fields.position),
// 			img: path,
// 			title: fields.title,
// 			textarea: fields.textarea,
// 			previewtext: fields.textarea.substr(0, 60) + "..."
// 		}

// 		var data = new sections(section);
// 		data.save();

// 	});

// 	res.send({redirect: '/sections'});
// }


// exports.createFeatures = function(req,res) {

// 	const form = new formidable.IncomingForm();
// 	var path;
// 	var array = [];
// 	form.multiples = true;

// 	form.on('fileBegin' , function(name, file){
// 		if(file.name != "") {
// 			file.path = './public/uploads/cards/' + file.name;
// 			path = 'uploads/cards/' + file.name;
// 			array.push({name: file.name, path: path});
// 		} else {
// 			array.push({name: null});
// 		}
// 		console.log(array);
// 	});

// 	form.on('file', function(name, file) {
// 	});
	
// 	form.on('error', function(err) {
// 	});

// 	form.parse(req, function(err,fields, files) {


// 		var dataFromFront = JSON.parse(fields.arr);
// 		var params = JSON.parse(fields.params);
		
// 		for(var i = 0; i < dataFromFront.length; i++) {
// 			if(dataFromFront[i].img.status) {
// 				if(dataFromFront[i].img.name == array[i].name){
// 					dataFromFront[i].img.path = array[i].path;
// 				}
// 			}
// 		}

// 		function getStatus(){
// 			if(params.display == undefined) {
// 				return params.display = "off";
// 			} else {
// 				return params.display;
// 			}
// 		}

// 		const section = {
// 			status: getStatus(),
// 			type: params.type,
// 			img: dataFromFront[0].img.path,
// 			position: parseInt(params.position),
// 			cards: dataFromFront
// 		}

// 		var data = new sections(section);
// 		data.save();

// 		res.send({redirect: '/sections'});
// 	});

// }


// exports.createSandbox = function(req,res){
// 	const form = new formidable.IncomingForm();
// 	var path;
// 	var array = [];
// 	form.multiples = true;

// 	form.on('fileBegin' , function(name, file){
// 		if( file.name == '') {
// 			console.log('You dont upload file');
// 		} else {
// 			console.log(file.name + ": was load");
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}
		
// 	});

// 	form.on('file', function(name, file) {
// 	});
	
// 	form.on('error', function(err) {
// 	});

// 	form.parse(req, function(err,fields, files) {

// 		function getStatus(){
// 			if(fields.display == undefined) {
// 				return fields.display = "off";
// 			} else {
// 				return fields.display;
// 			}
// 		}

// 		const section = {
// 			status: getStatus(),
// 			type: fields.type,
// 			size: fields.size,
// 			position: parseInt(fields.position),
// 			textarea: fields.inSection,
// 			images: JSON.parse(fields.images)
// 		}

// 		var data = new sections(section);
// 		data.save();
// 		res.send({redirect: '/sections', msg: 'success'});
// 	});
// }



// exports.edit = function(req,res){

// 	var id = req.params.id;
// 	var type = req.params.type;

// 	sections.findById({_id: id},function(err, data) {
// 		if( type == "Classic"){
// 			res.render('united/editClassic', {layout: 'main', items: data, local: lang()});
// 		} else if ( type == "Person"){
// 			res.render('united/editPerson', {layout: 'main', items: data, local: lang()});
// 		} else if ( type == "Wide"){
// 			res.render('united/editWide', {layout: 'main', items: data, local: lang()});
// 		} else if ( type == "Features"){
// 			res.render('united/editFeature', {layout: 'main', items: data, local: lang()});
// 		} else if ( type == "Sandbox"){
// 			res.render('united/editSandbox', {layout: 'main', items: data, local: lang()});
// 		}
// 	});
// }


// exports.update = function(req,res) {

// 	const form = new formidable.IncomingForm();
// 	var path;

// 	form.on('fileBegin' , function(name, file){
// 		if( file.name == '') {
// 			console.log('You dont upload file');
// 		} else {
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}
// 	});

// 	form.on('file', function(name, file) {
// 		console.log('Uploaded: ' + file.name);
// 	})

// 	form.parse(req, function(err,fields, files) {
// 		console.log(fields.id);
// 		const section = sections.findById({_id: fields.id}).execAsync();

// 		Promise.props({
// 			section: section
// 		}).then(function(results){

// 			if(path !== undefined){
// 				if(results.section.img !== undefined){
// 					fs.unlink('./public/' + results.section.img);
// 				}
// 			}

// 			function getStatus(){
// 				if(fields.display == undefined) {
// 					return fields.display = "off";
// 				} else {
// 					return fields.display;
// 				}
// 			}
// 			results.section.size = fields.size;
// 			results.section.status = getStatus();
// 			results.section.type = fields.type;
// 			results.section.extra = fields.extra;
// 			results.section.position = parseInt(fields.position);
// 			if(path === undefined){
// 				results.section.img = results.section.img;
// 			} else {
// 				results.section.img = path;
// 			}
// 			results.section.title = fields.title;
// 			results.section.textarea = fields.textarea;
// 			results.section.previewtext = fields.textarea.substr(0, 60) + "...";
// 			results.section.save();
// 			res.send({msg: 'success'});

// 		});
// 	});
// };


// exports.updateFeatures = function(req, res){

// 	const form = new formidable.IncomingForm();
// 	var path;
// 	var array = [];
// 	form.multiples = true;

// 	form.on('fileBegin' , function(name, file){
// 		if(file.name != "") {
// 			file.path = './public/uploads/cards/' + file.name;
// 			path = 'uploads/cards/' + file.name;
// 			array.push({name: file.name, path: path});
// 		} else {
// 			array.push({name: null});
// 		}
// 	});

// 	form.on('file', function(name, file) {
// 	});

// 	form.on('error', function(err) {
// 	});

// 	form.parse(req, function(err,fields, files) {


// 		var dataFromFront = JSON.parse(fields.arr);
// 		var params = JSON.parse(fields.params);

// 		const section = sections.findById({_id: params.id}).execAsync();

// 		Promise.props({
// 			section: section
// 		}).then(function(results){


// 			for(var i = 0; i < dataFromFront.length; i++) {
// 				if(dataFromFront[i].img.status) {
// 					if(dataFromFront[i].img.name == array[i].name){
// 						dataFromFront[i].img.path = array[i].path;
// 					}
// 				}
// 			}

// 			var arrayA = [],
// 				arrayB = [];

// 			for(var s = 0; s < results.section.cards.length; s++){
// 				arrayA.push(results.section.cards[s].img.path);
// 			}

// 			for(var i = 0; i < dataFromFront.length; i++) {
// 				arrayB.push(dataFromFront[i].img.path);
// 			}

// 			arrayA = arrayA.filter(e => !~arrayB.indexOf(e));

// 			arrayA.map(function(img){
// 				if(img != ""){
// 					fs.unlink('./public/' + img);
// 				}
// 			});

// 			function getStatus(){
// 				if(params.display == undefined) {
// 					return params.display = "off";
// 				} else {
// 					return params.display;
// 				}
// 			}

// 			function getImg(){
// 				if(dataFromFront.length == 0){
// 					return null;
// 				} else {
// 					return dataFromFront[0].img.path;
// 				}
// 			}
// 			results.section.img = getImg();
// 			results.section.status = getStatus();
// 			results.section.position = parseInt(params.position);
// 			results.section.cards = dataFromFront;
// 			results.section.save();
// 			res.send({msg: 'success'});
// 		});

// });

// }


// exports.updateSandbox = function(req,res){
// 	const form = new formidable.IncomingForm();
// 	var path;
// 	form.multiples = true;

// 	form.on('fileBegin' , function(name, file){
// 		if( file.name == '') {
// 			console.log('You dont upload file');
// 		} else {
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}
// 	});

// 	form.on('file', function(name, file) {
// 	});

// 	form.on('error', function(err) {
// 	});

// 	form.parse(req, function(err,fields, files) {

// 		const section = sections.findById({_id: fields.id}).execAsync();

// 		Promise.props({
// 			section: section
// 		}).then(function(results){

// 			var arrayA = [],
// 				arrayB = [],
// 				cameImages = JSON.parse(fields.images);


// 			for(var s = 0; s < results.section.images.length; s++){
// 				arrayA.push(results.section.images[s]);
// 			}

// 			for(var i = 0; i < cameImages.length; i++) {
// 				arrayB.push(cameImages[i]);
// 			}

// 			arrayA = arrayA.filter(e => !~arrayB.indexOf(e));

// 			arrayA.map(function(img){
// 				if(img != ""){
// 					fs.unlink('./public/uploads/' + img);
// 				}
// 			});


// 			function getStatus(){
// 				if(fields.display == undefined) {
// 					return fields.display = "off";
// 				} else {
// 					return fields.display;
// 				}
// 			}

// 			results.section.status = getStatus();
// 			results.section.size = fields.size;
// 			results.section.position = parseInt(fields.position);
// 			results.section.textarea = fields.inSection;
// 			results.section.images = JSON.parse(fields.images);
// 			results.section.save();
// 			res.send({msg: 'success'});
// 		});
// 	});
// }


// exports.delete = function(req,res){
// 	var id = req.params.id;
// 	const section = sections.findById({_id: id}).execAsync();

// 	Promise.props({
// 			section: section
// 		}).then(function(results){


// 		if(results.section.images.length > 0){
// 			results.section.images.map(function(img, i){
// 				console.log(results.section.images[i]);
// 				fs.unlinkSync('./public/uploads/' + results.section.images[i]);
// 			});
// 		}

// 		if(results.section.cards.length > 0) {
// 			results.section.cards.map(function(img, i){
// 				if(results.section.cards[i].img.path != undefined){
// 					fs.unlinkSync('./public/' + results.section.cards[i].img.path);
// 				}
// 			});
// 		} else if(results.section.cards.length == 0){
// 			console.log("work");
// 			if(results.section.img != undefined){
// 				fs.unlinkSync('./public/' + results.section.img);
// 			}
// 		}

// 		}).then(function(){
// 			sections.findByIdAndRemove(id).exec();
// 			res.redirect('/sections');
// 		});

// };

// exports.template = function(req,res){

// template.find({}, function(err, data){
// 	if(data == 0){
// 	const setting = {
// 		_id: "united",
// 		title: "united",
// 		templates: {
// 			active: 'standard'
// 		},
// 		logo: "",
// 		back: "",
// 		instagram: "",
// 		twitter: "",
// 		telegram: "",
// 		copyright: ""
// 	}

// 	var data = new template(setting);
// 	data.save();
// 	console.log("first settings");
// 	}

// 	res.render('united/template', {items: data[0], local: lang() });
// });

// }

// exports.editTemplate = function(req,res) {
// 	const form = new formidable.IncomingForm();
// 	var path;

// 	form.on('fileBegin' , function(name, file){
// 		console.log(file);
// 		if(file.name !== ""){
// 			file.path = './public/uploads/' + file.name;
// 			path = 'uploads/' + file.name;
// 		}
// 	});

// 	form.on('file', function(name, file) {
// 		console.log(file);
// 	})

// 	form.parse(req, function(err,fields, files) {
// 	const template = require('../../models/template.js');
// 	const templateSettings = template.findById({_id: 'united'}).execAsync();

// 	Promise.props({

// 		settings: templateSettings

// 	}).then(function(results){


// 			results.settings.title = fields.title;

// 			if(files.logotype.name == "" ){

// 				results.settings.logo = results.settings.logo;

// 			} else {

// 				results.settings.logo = files.logotype.path.substring(9);

// 			}

// 			if(files.back.name == "" ){

// 				results.settings.back = results.settings.back;

// 			} else {

// 				results.settings.back = files.back.path.substring(9);

// 			}

// 			results.settings.instagram = fields.instagram;

// 			results.settings.twitter = fields.twitter;

// 			results.settings.telegram = fields.telegram;

// 			results.settings.copyright = fields.copyright;

// 			results.settings.save();
// 			index.updateTemplate();
// 			res.send({msg: 'change saved'});
// 	});
// });

// }


// exports.login = function(req,res){
// 	res.redirect('/dashboard')
// }

// exports.logout = function(req,res){
// 	req.logout();
// 	res.redirect('/utd');
// }


// exports.settings = function(req,res){
// 	UserData.find({}, function(err, data){
// 		res.render('united/settings', {username: data[0].username, local: lang()});
// 	});
// }

// exports.seo = function(req,res){
// 	res.render('united/seo', {local: lang()});
// }

// exports.getStatus = function(req,res) {
// 	template.find({_id: 'united'}, function(err, data){
// 		res.send(data[0].templates.active);
// 	});
// }

// exports.getLang = function(req,res){
// 	let data = fs.readFileSync('config.json');
// 	let passLang = JSON.parse(data).lang;
// 	res.send(passLang);
// }


// exports.changeTemplate = function(req,res){

// 	const temp = req.body.id;
// 	const template = require('../../models/template.js');
// 	const templateSettings = template.findById({_id: 'united'}).execAsync();

// 	Promise.props({
// 		settings: templateSettings
// 	}).then(function(results){
// 		results.settings.templates = {
// 			active: temp
// 		};
// 		results.settings.save();
// 	});
// 	res.send({msg: 'template changed'});

// }


// exports.changeLanguage = async function(req,res){

// 	let getLangName = fs.readFileSync('config.json');
// 	let langName = JSON.parse(getLangName);

// 	langName.lang = req.body.id;

// 	await fs.writeFile('config.json',JSON.stringify(langName, null, 2), function (err) {
// 		if (err) {
// 		  console.log(err);
// 		} else {
// 			res.send({redirect: '/settings'});
// 		}
// 	});
	
// }


// exports.updateSecurity = function(req,res){
// 	const form = new formidable.IncomingForm();

// 	form.parse(req, function(err,fields, files) {

// 		function passMathes() {
// 			if(fields.newpassword == fields.confpassword && (fields.newpassword && fields.newpassword) != "") {
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		}


// 		UserData.find({}, function(err, data){
// 			if((fields.username == data[0].username) && passMathes()) {
// 				UserData.findOneAndRemove({}).exec();
// 				var newUser = new UserData({
// 					username: data[0].username,
// 					password: fields.newpassword
// 				});
// 				UserData.createUser(newUser);
// 				res.send({redirect: '/utd'});
// 			} else if(fields.username != data[0].username && fields.newpassword == ""){
// 				data[0].username = fields.username;
// 				data[0].save();
// 			} else if((fields.username != data[0].username) && passMathes()){
// 				UserData.findOneAndRemove({}).exec();
// 				var newUser = new UserData({
// 					username: fields.username,
// 					password: fields.newpassword
// 				});
// 				UserData.createUser(newUser);
// 				res.send({redirect: '/utd'});
// 			}
// 		});


// 	});


// }