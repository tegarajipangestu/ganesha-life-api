
var mongodb = require('mongodb');

exports.up = function(db, next){
	var userCollection = db.Collection('users');
	userCollection.insert({"name":"Tegar Aji Pangestu", "email":"tegarajipangestu@gmail.com", 
		"username":"tegarajipangestu",})
    next();
};

exports.down = function(db, next){
    next();
};
