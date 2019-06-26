const sections = require('../../models/sections.js');
const formidable = require('formidable');
const fs = require('fs');
const mongoose = require('mongoose');
const uid = require('uid');

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);



function lang(){
	let getLangName = fs.readFileSync('config.json');
	let langName = JSON.parse(getLangName).lang;
	let path = 'locals/' + langName + '.json';
	let getData = fs.readFileSync(path);
	return JSON.parse(getData);
}

// handlers for creating sections
exports.choose = function(req,res){
	res.render('united/choose', { local: lang()});
}

exports.classic = function(req,res){
	res.render('united/classic', { local: lang()});
}

exports.person = function(req,res){
	res.render('united/person', { local: lang()});
}

exports.wide = function(req,res){
	res.render('united/wide', { local: lang()});
}

exports.features = function(req,res){
	res.render('united/features', { local: lang()});
}

exports.sandbox = function(req,res){
	res.render('united/sandbox', { local: lang()});
}

// get page for edit section
exports.edit = function(req,res){

	var id = req.params.id;
	var type = req.params.type;

	sections.findById({_id: id},function(err, data) {
		if( type == "Classic"){
			res.render('united/editClassic', {layout: 'main', items: data, local: lang()});
		} else if ( type == "Person"){
			res.render('united/editPerson', {layout: 'main', items: data, local: lang()});
		} else if ( type == "Wide"){
			res.render('united/editWide', {layout: 'main', items: data, local: lang()});
		} else if ( type == "Features"){
			res.render('united/editFeature', {layout: 'main', items: data, local: lang()});
		} else if ( type == "Sandbox"){
			res.render('united/editSandbox', {layout: 'main', items: data, local: lang()});
		}
	});
}

// Create classic section
exports.createClassic = function(req,res){

	const form = new formidable.IncomingForm();
	var path;

	form.on('fileBegin' , function(name, file){
		if( file.name == '') {

		} else {

			let img = uid(10) + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/' + img;
			path = 'uploads/' + img;

		}
	});

	form.on('file', function(name, file) {})

	form.parse(req, function(err,fields, files) {

		function getStatus(){
			if(fields.display == undefined) {
				return fields.display = "off";
			} else {
				return fields.display;
			}
		}

		const section = {
			status: getStatus(),
			type: fields.type,
			position: parseInt(fields.position),
			img: path,
			title: fields.title,
			size: fields.size,
			textarea: fields.textarea,
			previewtext: fields.textarea.substr(0, 60) + "..."
		}

		var data = new sections(section);
		data.save();

	});

	res.send({redirect: '/sections'});

}

// Create person section

exports.createPerson = function(req,res){
	const form = new formidable.IncomingForm();
	var path;

	form.on('fileBegin' , function(name, file){
		if( file.name == '') {

		} else {

			let img = uid(10) + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/' + img;
			path = 'uploads/' + img;

		}
	});

	form.on('file', function(name, file) {
		if(file) {
			console.log('Uploaded: ' + file.name);
		} else {
			console.log('error');
		}
	})

	form.parse(req, function(err,fields, files) {

		function getStatus(){
			if(fields.display == undefined) {
				return fields.display = "off";
			} else {
				return fields.display;
			}
		}

		const section = {
			status: getStatus(),
			type: fields.type,
			position: parseInt(fields.position),
			img: path,
			title: fields.title,
			size: fields.size,
			extra: fields.extra,
			textarea: fields.textarea,
			previewtext: fields.textarea.substr(0, 60) + "..."
		}
		var data = new sections(section);
		data.save();
	});
	res.send({redirect: '/sections'});
}

exports.createWide = function(req,res){
	const form = new formidable.IncomingForm();
	var path;

	form.on('fileBegin' , function(name, file){
		if( file.name == '') {

		} else {

			let img = uid(10) + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/' + img;
			path = 'uploads/' + img;

		}
	});

	form.on('file', function(name, file) {

	})

	form.parse(req, function(err,fields, files) {


		function getStatus(){
			if(fields.display == undefined) {
				return fields.display = "off";
			} else {
				return fields.display;
			}
		}

		const section = {
			status: getStatus(),
			type: fields.type,
			position: parseInt(fields.position),
			img: path,
			title: fields.title,
			textarea: fields.textarea,
			previewtext: fields.textarea.substr(0, 60) + "..."
		}

		var data = new sections(section);
		data.save();

	});

	res.send({redirect: '/sections'});
}

exports.createFeatures = function(req,res) {

	const form = new formidable.IncomingForm();
	var path;
	var array = [];
	form.multiples = true;

	form.on('fileBegin' , function(name, file){
		if(file.name != "") {
			let imgName = uid(10),
				img = imgName + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/cards/' + img;
			path = 'uploads/cards/' + img;
			array.push({name: imgName, path: path});
		} else {
			array.push({name: null});
		}
	});

	form.on('file', function(name, file) {
	});
	
	form.on('error', function(err) {
	});

	form.parse(req, function(err,fields, files) {


		var dataFromFront = JSON.parse(fields.arr);
		var params = JSON.parse(fields.params);
		
		for(var i = 0; i < dataFromFront.length; i++) {
			dataFromFront[i].img.name = array[i].name;
			dataFromFront[i].img.path = array[i].path;
		}

		function getStatus(){
			if(params.display == undefined) {
				return params.display = "off";
			} else {
				return params.display;
			}
		}

		const section = {
			status: getStatus(),
			type: params.type,
			img: dataFromFront[0].img.path,
			position: parseInt(params.position),
			cards: dataFromFront
		}

		var data = new sections(section);
		data.save();

		res.send({redirect: '/sections'});
	});

}

exports.createSandbox = function(req,res){
	const form = new formidable.IncomingForm();
	var path;
	var array = [];
	form.multiples = true;

	form.on('fileBegin' , function(name, file){

		console.log(file);

		if( file.name == '') {
		} else {
			// let img = uid(10) + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/' + file.name;
			path = 'uploads/' + file.name;
			array.push(file.name);
		}
		
	});


	form.on('file', function(name, file) {
	});
	
	form.on('error', function(err) {
	});

	form.parse(req, function(err,fields, files) {

		function getStatus(){
			if(fields.display == undefined) {
				return fields.display = "off";
			} else {
				return fields.display;
			}
		}


		console.log(array);
		console.log(fields.inSection);

		const section = {
			status: getStatus(),
			type: fields.type,
			size: fields.size,
			position: parseInt(fields.position),
			textarea: fields.inSection,
			images: array
		}

		var data = new sections(section);
		data.save();
		res.send({redirect: '/sections', msg: 'success'});
	});
}

/*

	handlers for update sections

*/

exports.update = function(req,res) {

	const form = new formidable.IncomingForm();
	var path;


	form.on('fileBegin' , function(name, file){
		if( file.name == '') {

		} else {

			var img = uid(10) + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/' + img;
			path = 'uploads/' + img;

		}
	});

	form.on('file', function(name, file) {})


	form.parse(req, function(err,fields, files) {

		const section = sections.findById({_id: fields.id}).execAsync();
		Promise.props({
			section: section
		}).then(function(results){



			if(results.section.img !== undefined && path !== undefined){

				fs.unlinkSync('./public/' + results.section.img)

				results.section.img = path;

			} else if (path !== undefined) {

				results.section.img = path;

			}

			function getStatus(){
				if(fields.display == undefined) {
					return fields.display = "off";
				} else {
					return fields.display;
				}
			}
			results.section.size = fields.size;
			results.section.status = getStatus();
			results.section.type = fields.type;
			results.section.extra = fields.extra;

			results.section.position = parseInt(fields.position);
			results.section.title = fields.title;
			results.section.textarea = fields.textarea;
			results.section.previewtext = fields.textarea.substr(0, 60) + "...";
			
			results.section.save();


		});
	});
	form.on('end', function() {
		res.send({msg: 'success'});
	});
};


exports.updateFeatures = function(req, res){

	const form = new formidable.IncomingForm();
	var path;
	var array = [];
	form.multiples = true;

	form.on('fileBegin' , function(name, file){
		if(file.name != "") {
			let imgName = uid(10),
				img = imgName + file.name.substring(file.name.lastIndexOf('.'));

			file.path = './public/uploads/cards/' + img;
			path = 'uploads/cards/' + img;
			array.push({name: imgName, path: path});

		} else {
			array.push({name: null});
		}
	});



	form.on('file', function(name, file) {
	});

	form.on('error', function(err) {
	});

	form.parse(req, function(err,fields, files) {


		var dataFromFront = JSON.parse(fields.arr);
		var params = JSON.parse(fields.params);

		const section = sections.findById({_id: params.id}).execAsync();

		Promise.props({
			section: section
		}).then(function(results){

			for(var i = 0; i < dataFromFront.length; i++) {

				dataFromFront[i].img.name = array[i].name;
				dataFromFront[i].img.path = array[i].path;

			}


			// function findCardById(id){
			// 	for(let i = 0; i < results.section.cards.length; i++){
			// 		if(results.section.cards[i].id == id && results.section.cards[i].img.status) {
			// 			fs.unlinkSync('./public/' + results.section.cards[i].img.path);
			// 		}
			// 	}
			// }

			// // Удаления всех картинок которые будут изменены
			// for(let i = 0; i < dataFromFront.length; i++){
			// 	if( dataFromFront[i].img.status ) {
			// 		console.log('отправляем id на удаления : ' + dataFromFront[i].id);
			// 		//Вызов функции для удаления картинки с сервера
			// 		findCardById( dataFromFront[i].id )
			// 		// Поиск данных в базе
					
			// 	}
			// }

			for(let i = 0; i < dataFromFront.length; i++) {
				for(let s = 0; s < results.section.cards.length; s++){
					if(results.section.cards[s].id == dataFromFront[i].id && !dataFromFront[i].img.status) {
						dataFromFront[i].img.name = results.section.cards[s].img.name; 
						dataFromFront[i].img.path = results.section.cards[s].img.path;
						dataFromFront[i].img.status = true;
					}
				}
			}


			var arrayA = [],
				arrayB = [];

			for(var s = 0; s < results.section.cards.length; s++){
				arrayA.push(results.section.cards[s].img.path);
			}


			for(var i = 0; i < dataFromFront.length; i++) {
				arrayB.push(dataFromFront[i].img.path);
			}

			arrayA = arrayA.filter(e => !~arrayB.indexOf(e));

			arrayA.map(function(img){
				if(img){
					fs.unlinkSync('./public/' + img);
				}
			});

			function getStatus(){
				if(params.display == undefined) {
					return params.display = "off";
				} else {
					return params.display;
				}
			}

			function getImg(){
				if(dataFromFront.length == 0){
					return null;
				} else {
					return dataFromFront[0].img.path;
				}
			}

			results.section.img = getImg();
			results.section.status = getStatus();
			results.section.position = parseInt(params.position);
			results.section.cards = dataFromFront;
			results.section.save();
			res.send({msg: 'success'});
		});

});

}


exports.updateSandbox = function(req,res){
	const form = new formidable.IncomingForm();
	var path;
	var array = [];
	
	form.multiples = true;

	form.on('fileBegin' , function(name, file){
		if( file.name == '') {
		} else {
			file.path = './public/uploads/' + file.name;
			path = 'uploads/' + file.name;
			array.push(file.name);
		}
	});

	form.on('file', function(name, file) {
	});

	form.on('error', function(err) {
	});

	form.parse(req, function(err,fields, files) {

		const section = sections.findById({_id: fields.id}).execAsync();

		Promise.props({
			section: section
		}).then(function(results){

			var arrayA = [],
				arrayB = [],
				cameImages = JSON.parse(fields.images);


			for(var s = 0; s < results.section.images.length; s++){
				arrayA.push(results.section.images[s]);
			}

			for(var i = 0; i < cameImages.length; i++) {
				arrayB.push(cameImages[i]);
			}

			arrayA = arrayA.filter(e => !~arrayB.indexOf(e));


			console.log(arrayA);
			arrayA.map(function(img){
				if(img){
					fs.unlinkSync('./public/uploads/' + img);
				}
			});


			function getStatus(){
				if(fields.display == undefined) {
					return fields.display = "off";
				} else {
					return fields.display;
				}
			}

			results.section.status = getStatus();
			results.section.size = fields.size;
			results.section.position = parseInt(fields.position);
			results.section.textarea = fields.inSection;
			results.section.images = array;
			results.section.save();
			res.send({msg: 'success'});
		});
	});
}

/*

	handlers for delete section

*/

exports.delete = function(req,res){
	var id = req.params.id;
	const section = sections.findById({_id: id}).execAsync();

	Promise.props({
			section: section
		}).then(function(results){


		if(results.section.images.length > 0){
			results.section.images.map(function(img, i){
				// console.log(results.section.images[i]);
				fs.unlinkSync('./public/uploads/' + results.section.images[i]);
			});
		}

		if(results.section.cards.length > 0) {
			results.section.cards.map(function(img, i){
				if(results.section.cards[i].img.path != undefined){
					fs.unlinkSync('./public/' + results.section.cards[i].img.path);
				}
			});
		} else if(results.section.cards.length == 0){
			console.log("work");
			if(results.section.img != undefined){
				fs.unlinkSync('./public/' + results.section.img);
			}
		}

		}).then(function(){
			sections.findByIdAndRemove(id).exec();
			res.redirect('/sections');
		});

};