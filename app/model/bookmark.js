var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var BookmarkSchema   = new Schema({
    user_id: String,
    post_id:String,
    title: String,
    publisherId:String,
    publisher: String,
    rating: Number,
    title: String,
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);