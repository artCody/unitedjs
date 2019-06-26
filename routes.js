const express = require('express');
const main = require('./handlers/main/main.js');

// system module to work with main routes, system settings, login/logout
const system = require('./handlers/utd/system.js');

// template module to work with templates for frontend view
const templates = require('./handlers/utd/templates.js');

// sections module to work with sections
const sections = require('./handlers/utd/sections.js');


// const united = require('./handlers/utd/united.js');
const passport = require('passport');


module.exports = function(app) {

	app.get('/', main.home);

	app.get('/followers', ensureAuthenticated, system.followers);
	app.post('/subscribe', ensureAuthenticated, main.subscribe)

	app.put('/change-follower', ensureAuthenticated, system.changeFollower);

	app.post('/email', ensureAuthenticated, system.email);


	//	united routes
	app.get('/utd', system.utd);
	app.get('/dashboard',ensureAuthenticated, system.dashboard);
	app.get('/choose',ensureAuthenticated, system.choose);
	app.get('/template',ensureAuthenticated, templates.template);
	app.get('/sections',ensureAuthenticated, system.sections);
	app.get('/settings/:param',ensureAuthenticated, system.settings);
	app.get('/seo', ensureAuthenticated, templates.seo);
	app.get('/visitors', ensureAuthenticated, system.visitors);
	app.get('/followers', ensureAuthenticated, system.followers);

	//	templates sections
	app.get('/classic',ensureAuthenticated,sections.classic);
	app.get('/person',ensureAuthenticated,sections.person);
	app.get('/wide',ensureAuthenticated,sections.wide);
	app.get('/features', ensureAuthenticated, sections.features);
	app.get('/sandbox', ensureAuthenticated, sections.sandbox);


	//	Create Section classic
	app.post('/classic/create',ensureAuthenticated,sections.createClassic);
	//	Create section person 
	app.post('/person/create',ensureAuthenticated,sections.createPerson);
	//	Create section wide
	app.post('/wide/create',ensureAuthenticated,sections.createWide);
	//	Create section features
	app.post('/features/create', ensureAuthenticated, sections.createFeatures);
	//	Create section sandbox
	app.post('/sandbox/create', ensureAuthenticated, sections.createSandbox);

	//	update section
	app.put('/update', ensureAuthenticated, sections.update);
	app.put('/update/features', ensureAuthenticated, sections.updateFeatures);
	app.put('/update/sandbox', ensureAuthenticated, sections.updateSandbox);



	// Edit template 
	app.put('/edit-template', ensureAuthenticated, templates.editTemplate);
	// Change TEMPLATE
	app.post('/change-template',ensureAuthenticated, templates.changeTemplate);
	// Change Languages
	app.post('/change-lang', ensureAuthenticated, system.changeLanguage)
	// GET status template panel 
	app.get('/getStatus', templates.getStatus);


	// Edit seo settings
	app.post('/edit-seo', templates.editSeo);

	// Delete image logotype or background
	app.delete('/template/delete-image', templates.deleteImage);

	// GET language system
	app.get('/getLang', system.getLang);


	//security
	app.post('/security/update', ensureAuthenticated, system.updateSecurity);

	//	Login
	app.post('/login',passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect: '/utd'}), system.login);

	//	logout
	app.get('/logout', system.logout);


	// get page for edit section
	app.get('/edit/:type/:id', ensureAuthenticated, sections.edit);

	// Get Statistic for diagram
	app.get('/getStatistic', ensureAuthenticated, system.statistic);


	// delete section
	app.get('/delete/:id', ensureAuthenticated, sections.delete);

	app.delete('/delete-follower', ensureAuthenticated, system.deleteFollower);

	function ensureAuthenticated(req,res,next){
		if(req.isAuthenticated()){
			return next();
		} else {
			res.redirect('/utd');
		}
	}
}