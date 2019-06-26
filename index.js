const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const uid = require('uid');
const fs = require('fs');
// ------------------------------------------
//	login system with passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
// ------------------------------------------




//	Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// app.set('trust proxy', true);

//	Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//	Passport init
app.use(passport.initialize());
app.use(passport.session());


//	Database
mongoose.connect('mongodb://localhost:27017/united', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//	path static files
app.use(express.static(__dirname + '/public'));

//	PORT
app.set('port', process.env.PORT || 80);

//	setup handlebars view engine
const handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
	helpers: {
		section: function(name,options) {
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},
		eq: function (v1, v2) {
			return v1 == v2;
		}
	},
});




app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//	Promise
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);



var template = require('./models/template.js');


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
		console.log("⚙️	Unitedjs created default settings for temaplte...");
	}
});


// ----------------------Administrator-------------------------------- //
const UserData = require('./models/user.js');

passport.use(new LocalStrategy(
	function(username,password,done){
		UserData.getUserByUsername(username, function(err,user){
			if(err) throw err;
			if(!user){
				return done(null, false);
			}
		UserData.comparePassword(password, user.password, function(err, isMatch){
			if(err) throw err;
			if(isMatch){
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	});
}));

passport.serializeUser(function(user,done){
	done(null, user.id);
});

passport.deserializeUser(function(id,done){
	UserData.getUserById(id, function(err,user){
		done(err,user);
	});
});



function format(seconds){
	function pad(s){
	  return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60*60));
	var minutes = Math.floor(seconds % (60*60) / 60);
	var seconds = Math.floor(seconds % 60);
  
	return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
  

// ------------------------------------------------------------------- //

//	ROUTES
const routes = require('./routes.js')(app);

const server = app.listen(app.get('port'), function() {
	console.log('Node server started on http://localhost:' + app.get('port'));
});


// Socket.io work


const followers = require('./models/followers.js');


var io = require('socket.io').listen(server);

io.on('connection', function(socket){
	followers.find().then(function(doc) {
		socket.emit('update followers', {followers: doc });
	});
	setInterval(function(){
		followers.find().then(function(doc) {
			socket.emit('update followers', {followers: doc });
		});	
	},5000);


});
