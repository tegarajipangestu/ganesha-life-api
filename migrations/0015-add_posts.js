
var mongodb = require('mongodb');

exports.up = function(db, next){
		var posts = db.Collection('posts');
		posts.insert({postId: "1",}, next)
};

exports.down = function(db, next){
    next();
};
