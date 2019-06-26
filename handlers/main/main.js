const express = require('express');
const axios = require('axios');
const UserData = require('../../models/user.js');
const template = require('../../models/template.js');
const sections = require('../../models/sections.js');
const followers = require('../../models/followers.js');
const visits = require('../../models/visits.js');
var index = require("../../index.js");
const mongoose = require('mongoose');

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

exports.home = async function(req,res) {

	
	// let info;

	function getIP(){
		const ip = req.headers['x-Forwarded-for'] || req.connection.remoteAddress;
		if(ip == '::1'){
			return 'localhost';
		} else {
			return ip.split(':')[3];
		}
	}

	const getInformation = async () => {
			
		  return await axios.get(`https://api.ipdata.co/${getIP()}/?api-key=49e4874d07070c3e4034bed5bc0f3ae71c3e38513251985c934dfcff`, {headers: {'Accept': 'application/json'}}).then(response => {
			return response.data;
		}).catch(error => { return {
			ip: getIP(), 
			city: 'unknown', 
			country_name: 'unknown',
			time_zone: {
				current_time: 'unknown'
			}
		}});
	}

	const templateSettings = template.findById({_id: 'united'}).execAsync();
	const section = sections.find({$or: [{status: 'on'}]}).sort({position: 1}).execAsync();
	const visitor = visits.find({}).execAsync();
	const checkuniq = visits.findOne({ip: getIP()});

	function getBrowser(arg){
		let browser = 'unknow';
		if( /firefox/i.test(arg) ){
			browser = 'firefox';
		} else if( /chrome/i.test(arg) ){
			browser = 'chrome';
		} else if( /safari/i.test(arg) ){
			browser = 'safari';
		} else if( /msie/i.test(arg) ){
			browser = 'msie';
		} else {
			browser = 'unknown';
		}
		return browser;
	}


	function getData(arg){
		if(arg != 'unknown'){
			let date = arg.split('T');
			return {
				year: date[0].split('-')[0],
				month: date[0].split('-')[1],
				day: date[0].split('-')[2],
				time: date[1].split('.')[0]
			}
		}

	}

	// console.log(templateSettings);
	Promise.props({
			section: section,
			template: templateSettings,
			info: getInformation() || undefined,
			visits: visitor,
			checkuniq: checkuniq
		}).then(function(results){

			const visitor = {
				session: req.sessionID,
				ip: results.info.ip,
				browser: getBrowser(req.headers['user-agent']),
				city: results.info.city,
				country: results.info.country_name,
				date: getData(results.info.time_zone.current_time)
			}

			if(results.checkuniq){
			} else {
				var data = new visits(visitor);
				data.save();
			}

			res.render('main/home', {layout: results.template.templates.active, items: results.section, settings: results.template});
	});
}




exports.subscribe = function(req,res){

	const follower = {
		status: false,
		name: req.body.name,
		email: req.body.email,
	}

	const data = new followers(follower);
	data.save()
	res.send({msg:'thanks for subscribing'})

}