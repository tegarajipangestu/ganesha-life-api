var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('mongoose');
var dotenv = require('dotenv').config();
var moment = require('moment');
var md5 = require('md5');
var randtoken = require('rand-token');

var now = moment();
var email_regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

var Post = require('./app/model/post.js');
var Category = require('./app/model/category.js');
var Follow = require('./app/model/follow.js');
var User = require('./app/model/user.js');
var UserSession = require('./app/model/user_session.js');


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


db.connect(process.env.MONGODB_DEV);

var port = process.env.PORT || 8080;

var mobileglapi = express.Router();
var api = express.Router();
var rootapi = express.Router();

var templateRes = {};
templateRes['error'] = true;
templateRes['alerts'] = {code: 200, message: "Tidak bisa gans"};

mobileglapi.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

mobileglapi.get('/posts', function(req, res) {
	res.json({
		message: 'hooray! welcome to our api!'
	});
});

mobileglapi.post('/seeding', function(req, res) {
	var secret = req.body.secret;
	if (secret !== process.env.SEEDINGSECRET) {
		res.json({
			"message": "Hayo kate lapo cuk"
		});
	};

	var category = new Category();
	var post = new Post();
	var user = new User();

	UserSession.collection.remove(function (err) {	
	});
	Category.collection.remove(function (err) {	
	});
	User.collection.remove(function (err) {	
	});
	Post.collection.remove(function (err) {	
	});
	var categories =
		[{
			name: "highlight",
			description: "Semua yang hits ada di sini"
		}, {
			name: "lomba",
			description: "Semua yang lomba ada di sini"
		}, {
			name: "acara",
			description: "Semua yang acara ada di sini"
		}, {
			name: "beasiswa",
			description: "Semua yang beasiswa ada di sini"
		}, {
			name: "isukampus",
			description: "Semua yang beasiswa ada di sini"
		}, ];
	category.collection.insert(categories, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			})
		} else {
			res.json({
				"message": "Berhasil cuk"
			});
		}
	})
});

mobileglapi.route('/posts').
post(function(req, res) {
	Post.find({})

});


mobileglapi.route('/posts').
post(function(req, res) {
	Follow.findById(req.body.userId, function(err, follows) {
		console.log(follows);
	})
});

mobileglapi.route('/login').
post(function(req, res) {
	templateRes.error = true;
	templateRes.alerts = {code: 200, message:"Login salah, silahkan cek email dan password anda"};
	templateRes.data = {};
	var mode = email_regex.test(req.body.username) ? "email" : "username";
	var query = {};
	query[mode] = req.body.username;
	User.findOne(query, function(err, user) {
		// if (user.confirmed === 0) {
		// 	templateRes.alerts = {code: 200, message:"Anda belum konfirmasi email"};
		// 	res.send(templateRes);
		// 	return;
		// }
		if (user.password === md5(req.body.password)) {
			var token = randtoken.generate(32);
			UserSession.create({userId: user._id, sessionId: token, createdAt: now.format('dddd, MMMM Do YYYY, h:mm:ss a')}, function(err) {
				if (err) {
					res.send(templateRes);
					return
				}
				else {
					user.token = token;
					templateRes.error = false;
					templateRes.alerts = {code: 200, message:"Login berhasil"};
					templateRes.data = user;
					res.send(templateRes);	
					return				
				}
			});
		} else {
			res.send(templateRes);
		}
	});
});

mobileglapi.route('/logout').
post(function(req, res) {
	templateRes.error = true;
	templateRes.alerts = {code: 200, message:"Logout gagal"};
	templateRes.data = {};
	UserSession.find({sessionId: req.body.token}).remove(function (err) {
		if (err) {
			res.send(templateRes);
			return
		}
		templateRes.error = false;
		templateRes.alerts = {code: 200, message:"Logout gagal"};
		res.json(templateRes);
	})
});

mobileglapi.route('/changepassword').
post(function(req, res) {
	templateRes.error = true;
	templateRes.alerts = {code: 200, message:"Change Password gagal"};
	templateRes.data = {};
	var token = req.get('token');
	UserSession.findOne({sessionId: token}, function (err, session) {
		User.findById(session.userId, function (err, user) {
			if (err) {
				res.send(templateRes);
				return;
			}
			if (md5(req.body.oldPassword) === user.password) {
				user.password = md5(req.body.newPassword);
				console.log(user);
				user.save(function (err) {
					if (err) {
						console.log(err);
						res.send(templateRes);
						return;
					}
					else {
						templateRes.error = true;
						templateRes.alerts = {code: 200, message:"Change Password berhasil"};
						templateRes.data = user;
						res.send(templateRes);
						return;
					}
				});
			}
			else {
				res.send(templateRes);
			}
		}); 
	});
});
	

api.route('/posts').
post(function(req, res) {
	var post = new Post();
	Post.count({}, function(err, c) {
		post.title = req.body.title;
		post.publisher = req.body.publisher;
		post.publisherId = c + 1;
		post.content = req.body.content;
		post.rating = 0;
		post.postedAt = now.format('dddd, MMMM Do YYYY, h:mm:ss a');
		post.imageUrl = (req.body.imageUrl === undefined) ? 'https://qph.is.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013?convert_to_webp=true' : req.body.imageUrl;
		post.category = (req.body.category === undefined) ? 'umum' : req.body.category;
		post.save(function(err) {
			if (err) res.send(err);
			res.json(post);
		});
	});
});

api.route('/users').
post(function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.name = req.body.name;
	user.password = md5(req.body.password);
	user.email = req.body.email;
	user.perishable_token = randtoken.generate(32);
	user.imageUrl = (req.body.imageUrl === undefined) ? 'https://qph.is.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013?convert_to_webp=true' : req.body.imageUrl;
	user.value = 10;
	user.confirmed = 0;
	user.save(function(err) {
		if (err) {
			res.send(err);
			return;
		}
		console.log("Save record successful");
		user.sendEmailAfterRegistration(function(err, json) {
			if (err) res.send(err);
			templateRes.error = false;
			templateRes.alerts = {code:200, message: "Login success"};
			templateRes.data = user;
			// console.log(templateRes);
			res.json(templateRes);
		});
	});
});

rootapi.route('/confirm').
get(function(req, res) {
	User.findOne({
		perishable_token: req.query.token
	}, function(err, user) {
		user.perishable_token = null;
		user.confirmed = 1;
		user.save(function(err) {
			if (err) res.send(err);
			user.sendEmailAfterConfirmation(function(err) {
				res.json({
					message: "Pendaftaran berhasil!"
				});
			});
		});
	});
});

app.use('/mobileglapi', mobileglapi);
app.use('/api', api);
app.use('/', rootapi);
app.listen(port);

console.log('Magic happens on port ' + port);