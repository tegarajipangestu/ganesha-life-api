var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment = require('moment');


var PostSchema   = new Schema({
    postId:String,
    title: String,
    publisher: String,
    publisherId: String,
    content: String,
    rating: Number,
    postedAt: Date,
    imageUrl: String, 
    kategori: Number,
});

PostSchema.pre('save', function(next) {

  this.postedAt = moment().format('YYYY-MM-DD HH:mm:ss Z');
	this.rating = 0;

  next();
});
module.exports = mongoose.model('Post', PostSchema);