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

module.exports = mongoose.model('Post', PostSchema);