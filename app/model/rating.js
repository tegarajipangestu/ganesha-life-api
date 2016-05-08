var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RatingSchema   = new Schema({
    userId: String,
    postId: String,
    rating: Number,
    description: String,
});

module.exports = mongoose.model('Rating', RatingSchema);