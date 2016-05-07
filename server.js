var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('mongoose');
var dotenv = require('dotenv').config();
var moment = require('moment');
var md5 = require('md5');
var randtoken = require('rand-token');

var now = moment();

var Post = require('./app/model/post.js');
var Category = require('./app/model/category.js');
var Follow = require('./app/model/follow.js');
var User = require('./app/model/user.js');


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


db.connect(process.env.MONGODB_DEV);

var port = process.env.PORT || 8080;

var mobileglapi = express.Router();
var api = express.Router();
var rootapi = express.Router();

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
	category.collection.remove(function(err) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
		}
	});
	post.collection.remove(function(err) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
		}
	});
	user.collection.remove(function(err) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
		}
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


api.route('/posts').
post(function(req, res) {
	var post = new Post();
	Post.count({}, function(err, c) {
		post.title = req.body.title;
		post.publisher = req.body.publisher;
		post.publisherId = c + 1;
		post.content = req.body.content;
		post.rating = 0;
		post.postedAt = now.format('YYYY-MM-DD HH:mm:ss Z');
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
		if (err) res.send(err);
		console.log("Save record successful");
		user.sendEmailAfterRegistration(function(err, json) {
			console.log(json);
			res.json(user);
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