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
var User = require('./app/model/user.js');
var UserSession = require('./app/model/user_session.js');
var Publisher = require('./app/model/publisher.js');
var Bookmark = require('./app/model/bookmark.js');
var FollowPublisher = require('./app/model/follow_publisher.js');
var FollowCategory = require('./app/model/follow_category.js');
var Rating = require('./app/model/rating.js');


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

	UserSession.collection.remove(function (err) {	
	});
	Category.collection.remove(function (err) {	
	});
	User.collection.remove(function (err) {	
	});
	Post.collection.remove(function (err) {	
	});
	Publisher.collection.remove(function (err) {	
	});
	Bookmark.collection.remove(function (err) {	
	});
	FollowCategory.collection.remove(function (err) {	
	});
	FollowPublisher.collection.remove(function (err) {	
	});
	Rating.collection.remove(function (err) {	
	});

	var ratings = {
		userId: "1",
		postId: "1",
		rating: 3,
		description: "Post ini sangat inspiratif"
	}
	var bookmarks = {
		user_id: "1",
		post_id:"1",
		title: "Secret Behind AADC 2`s Success Revealed",
		publisherId: "1",
		publisher: "HMIF ITB",
		rating: 4.0,
	}
	var follow_publisher = {
		userId: "1",
		publisherId:"1",
	}
	var follow_category = {
		userId: "1",
		categoryId:"1",
	}
	var users = {
		"_id":"1",
    "confirmed": 1,
    "value": 100,
    "imageUrl": "https://qph.is.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013?convert_to_webp=true",
    "perishable_token": randtoken.generate(32),
    "email": "tegarajipangestu@gmail.com",
    "password": md5(process.env.PASSWORD_DUMMY),
    "name": "Tegar Aji Pangestu",
    "username": "tegarnization",	
	}
	var publisher = {
		"_id": "1",
    "confirmed": 1,
    "value": 50,
    "imageUrl": "https://qph.is.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013?convert_to_webp=true",
    "perishable_token": randtoken.generate(32),
    "email": "hmif@itb.ac.id",
    "password": md5(process.env.PASSWORD_DUMMY),
    "name": "HMIF ITB",
    "publisher": "HMIF ITB",
    "username": "hmif_itb",	
    "rating": 4.0,
    "type":"Publisher",
    "keterangan":"Himpunan Mahasiswa Informatika ITB"
	}
	var categories =
		[{
			_id:"1",
			name: "highlight",
			description: "Semua yang hits ada di sini"
		}, {
			_id:"2",
			name: "lomba",
			description: "Semua yang lomba ada di sini"
		}, {
			_id:"3",
			name: "acara",
			description: "Semua yang acara ada di sini"
		}, {
			_id:"4",
			name: "beasiswa",
			description: "Semua yang beasiswa ada di sini"
		}, {
			_id:"5",
			name: "isukampus",
			description: "Semua yang beasiswa ada di sini"
		}, ];

		var posts = {
			_id: "1",
			title: "Secret Behind AADC 2`s Success Revealed",
			publisher: "HMIF ITB",
			publisherId: "1",
			content: "- “Ada Apa Dengan Cinta 2” (What’s Up With Love 2) film has been attracting one million viewers since its premiere on April, 28, Mira Lesmana said. “From its premiere to the next five days [it has attracted] a million viewers, and I hope it continues to rise,” said the producer of “Ada Apa Dengan Cinta 2” (AADC 2) on the sidelines of a press conference with the cast in Surabaya as quoted by Bisnis.com on Thursday. Mira, also the scriptwriter of AADC 2, has extended her gratitude over the enthusiasm of Indonesian viewers, and the response that she said was overwhelming. She said that the number of viewers overseas, among others in Malaysia has helped the film scored two million ringgit or around Rp6.4 billion after five days of screening in 100 theatres in the country. The film has also received warm reception in Brunei Darussalam. However, she did not reveal the number of viewers. The press conference in Surabaya was also attended by AADC 2 filmmaker Riri Riza and the main cast, among others, Nicholas Saputra (Rangga), Dian Sastrowardoyo, (Cinta), Adinia Wirasti (Karmen), Sissy Prescillia (Milly) and Dennis Adhiswara (Mamet). Riri Riza revealed the secret behind the movie’s success. He claims that he is proud of AADC 2, because the actors are capable of playing their respective roles despite not being in their teens anymore. “Dian Sastrowardoyo, dispate being a mother in real life, was able to act like a single women and a girl who falls in love,” he said",
			rating: 4.4,
			postedAt: now.format('dddd, MMMM Do YYYY, h:mm:ss a'),
			kategori: 1,
			imageUrl: "http://cdn.tmpo.co/data/2016/02/15/id_482531/482531_620.jpg",
		}
	Rating.collection.insert(ratings, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	FollowPublisher.collection.insert(follow_publisher, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	FollowCategory.collection.insert(follow_category, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	Bookmark.collection.insert(bookmarks, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});

	Post.collection.insert(posts, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	Publisher.collection.insert(publisher, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	Category.collection.insert(categories, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	User.collection.insert(users, function(err, docs) {
		if (err) {
			res.json({
				"message": "Gagal cuk"
			});
			return;
		}
	});
	User.findOne({username: "tegarnization"}, function (err, user) {
		var userId = 	user._id;
		var usersessions = {sessionId: randtoken.generate(32), userId: userId};
		UserSession.collection.insert(usersessions, function(err, docs) {
			if (err) {
				res.json({
					"message": "Gagal cuk"
				})
			} else {
				res.json({
					"message": "Berhasil cuk"
				});
			}
		});
	});
});

mobileglapi.route('/posts').
post(function(req, res) {
	templateRes.error = true;
	templateRes.alerts = {code: 200, message:"Retrieve post gagal"};
	var result = [];

	FollowPublisher.find({userId:req.body.userId}, function(err, follows) {
		if (err) {
			templateRes.alerts = {code: 200, message:"User tidak memfollow publisher apapun"};
			res.send(templateRes);
			return;
		}
		for (var i=0; i<follows.length; i++) {
			Post.find({kategori: req.body.kategori, publisherId:follows[i].publisherId}, function (err, posts) {
				result.push.apply(result,posts);
				if (i===(follows.length)) {
					templateRes.error = false;
					templateRes.alerts = {code: 200, message:"Post berhasil didapatkan"};		
					templateRes.data = result;
					res.send(templateRes);
					return;					
				}
			});
		}
	});
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
		if (user.confirmed === 0) {
			templateRes.alerts = {code: 200, message:"Anda belum konfirmasi email"};
			res.send(templateRes);
			return;
		}
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

rootapi.route('/change').get(function (req,res) {
	//TODO menangani change password
	res.send({message: "Halo sayang"});
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
	

mobileglapi.route('/forgotpassword').
post(function(req, res) {
	templateRes.error = true;
	templateRes.alerts = {code: 200, message:"Forgot Password gagal"};
	templateRes.data = {};
	var token = req.get('token');
	UserSession.findOne({sessionId: token}, function (err, session) {
		User.findById(session.userId, function (err, user) {
			if (err) {
				res.send(templateRes);
				return;
			}
			if (user.confirmed === 0) {
				templateRes.alerts = {code: 200, message:"Anda belum konfirmasi email"};
				res.send(templateRes);
				return;
			}
			if (req.body.email === user.email) {
				user.perishable_token = randtoken.generate(32);
				user.save(function (err) {
					if (err) {
						res.send(templateRes);
						return;
					}
				});
				user.sendForgotPassword(function (err) {
					if (err) {
						res.send(templateRes);
						return;
					}
					templateRes.error = false;
					templateRes.alerts = {code: 200, message:"Forgot Password request success"};
					templateRes.data = {};	
					res.json(templateRes);
					return;				
				});
			}
			else {
				templateRes.alerts = {code: 200, message:"Email salah. Forgot Password gagal"};
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
			templateRes.alerts = {code:200, message: "Register success"};
			templateRes.data = user;
			// console.log(templateRes);
			res.json(templateRes);
		});
	});
});

mobileglapi.route('/signup').
post(function(req, res) {
	var user = new User();	
	user.username = req.body.username;
	user.name = req.body.name ? req.body.name : req.body.username;
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
			templateRes.alerts = {code:200, message: "Signup success"};
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