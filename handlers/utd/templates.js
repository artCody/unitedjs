const template = require('../../models/template.js');
const fs = require('fs');
const formidable = require('formidable');
const Promise = require('bluebird');
const uid = require('uid');


function lang(){
	let getLangName = fs.readFileSync('config.json');
	let langName = JSON.parse(getLangName).lang;
	let path = 'locals/' + langName + '.json';
	let getData = fs.readFileSync(path);
	return JSON.parse(getData);
}

exports.template = function(req,res){

	template.find({}, function(err, data){

		if(data == 0){

			const setting = {
				_id: "united",
				title: "united",
				templates: {
					active: 'standard'
				},
				logo: "",
				maintext: "Standard theme landing Page Builders to Make One Page Websites",
				extratext: 'do something yourself',
				font: 'Open Sans',
				phone: '',
				back: "",
				bgOverlay: {
					overlay: false,
					opacity: 0.50,
					firstColor: '#e66465',
					colorRangeFirst: '0',
					secondColor: '#fa0548',
					colorRangeSecond: '100',
					angle: '150'
				},
				instagram: "",
				twitter: "",
				telegram: "",
				copyright: ""
			}

			var data = new template(setting);
			data.save();
			console.log("first settings");
		}
		res.render('united/template', {items: data[0], local: lang(), active: {template: true } });
	});
	
}


// Edit template
exports.editTemplate = function(req,res){
	const form = new formidable.IncomingForm();
	var templateSettings = template.findById({_id: 'united'}).execAsync();
	var path;
	form.multiples = true;

	form.on('fileBegin' , function(name, file){
		if( file.name == '') {

		} else {

			let img = uid(10) + file.name.substring(file.name.lastIndexOf('.'));
			file.path = './public/uploads/' + img;
			path = 'uploads/' + img;

		}
	});

	form.on('file', function(name, file) {
	});

	form.parse(req, function(err,fields, files) {

		Promise.props({

			settings: templateSettings

		}).then(function(results){



				results.settings.file = files.file.path.substring(9);

				results.settings.title = fields.title;

				if(files.logotype.name == ""){

					results.settings.logo = results.settings.logo;

				} else {
					if(results.settings.logo == "") {
						results.settings.logo = files.logotype.path.substring(9);
					} else if(results.settings.logo != "" && files.logotype.name != ""){
						fs.unlinkSync('./public/' + results.settings.logo);
						results.settings.logo = files.logotype.path.substring(9);
						
					}
				}



				if(files.back.name == "" ){

					results.settings.back = results.settings.back;

				} else {
					
					if(results.settings.back == "") {
						results.settings.back = files.back.path.substring(9);
					} else if(results.settings.back != "" && files.back.name != ""){
						fs.unlinkSync('./public/' + results.settings.back);
						results.settings.back = files.back.path.substring(9);
					}

				}


				

				results.settings.bgOverlay = {
					overlay: fields.overlay ? true: false,
					opacity: fields.opacity,
					firstColor: fields.firstColor,
					colorRangeFirst: fields.colorRangeFirst,
					secondColor: fields.secondColor,
					colorRangeSecond: fields.colorRangeSecond,
					angle: fields.angle
				}

				

				results.settings.maintext = fields.maintext;

				results.settings.extratext = fields.extratext;

				results.settings.font = fields.font;


				results.settings.phone = fields.phone;

				results.settings.instagram = fields.instagram;

				results.settings.twitter = fields.twitter;

				results.settings.telegram = fields.telegram;

				results.settings.copyright = fields.copyright;

				results.settings.save();
				res.send({msg: 'change saved'});
		});
	});
}


exports.changeTemplate = function(req,res){

	const temp = req.body.id;
	const template = require('../../models/template.js');
	const templateSettings = template.findById({_id: 'united'}).execAsync();

	Promise.props({
		settings: templateSettings
	}).then(function(results){
		results.settings.templates = {
			active: temp
		};
		results.settings.save();
	});
	res.send({msg: 'template changed'});

}


exports.getStatus = function(req,res) {
	template.find({_id: 'united'}, function(err, data){
		res.send(data[0].templates.active);
	});
}


exports.deleteImage = function(req, res){

	const template = require('../../models/template.js');
	const templateSettings = template.findById({_id: 'united'}).execAsync();

	Promise.props({

		settings: templateSettings

	}).then(function(results){

		let img = results.settings[req.body.img];

		if(img != '') {
			results.settings[req.body.img] = '';
			fs.unlinkSync('./public/' + img);
		}

		results.settings.save();

	});

	res.send({msg: 'image delete'});
}



exports.seo = function(req,res){
	template.find({}, function(err, data){
		res.render('united/seo', {items: data[0], local: lang(),active: {seo: true }});
	});
}

exports.editSeo = function(req,res){
	
	const templateSettings = template.findById({_id: 'united'}).execAsync();
	
	Promise.props({
		settings: templateSettings
	}).then(function(results){
		results.settings.seo = req.body;
		results.settings.save();
	});
	res.send({msg: 'SEO changed'});

}