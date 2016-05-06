// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var db = require('mongoose');
var dotenv = require('dotenv').config();
var moment = require('moment');
var now = moment();

var Post = require('./app/model/post.js');
var Category = require('./app/model/category.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


//configuration mongodb
db.connect(process.env.MONGODB_DEV);

var port = process.env.PORT || 8080; // set our port

var mobileglapi = express.Router();
var api = express.Router();

mobileglapi.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
api.get('/posts', function(req, res) {
	res.json({
		message: 'hooray! welcome to our api!'
	});
});

mobileglapi.get('/seeding', function(req, res) {
	var category = new Category();
	category.collection.remove(function(err) {
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


api.route('/posts').post(function(req, res) {
	var post = new Post();
	Post.count({}, function(err, c) {
		post.title = req.body.title;
		post.publisher = req.body.publisher;
		post.publisherId = c + 1;
		post.content = req.body.content;
		post.imageUrl = (req.body.imageUrl === undefined) ? 'https://qph.is.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013?convert_to_webp=true' : req.body.imageUrl;
		post.category = (req.body.category === undefined) ? '0' : req.body.category;
		post.save(function(err) {
			if (err) res.end(err);
			res.json(post);
		})
	})
});

app.use('/mobileglapi', mobileglapi);
app.use('/api', api);
app.listen(port);
console.log('Magic happens on port ' + port);


var seed = [{
	"name": "highlight",
	"description": "Semua yang hits ada di sini",
}, {
	"name": "lomba",
	"description": "Semua yang lomba ada di sini",
}];