var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    postId: String,
    title: String,
    publisher: String,
    publisherId: String,
    content: String,
    rating: Number,
    postedAt: Date,
    imageUrl: String, 
    category: String,
});

PostSchema.pre('save', function(next) {

  this.postedAt = now.format('YYYY-MM-DD HH:mm:ss Z');
	this.rating = 0;

  next();
});
module.exports = mongoose.model('Post', PostSchema);