var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var FollowSchema   = new Schema({
    categoryId: String,
    userId: String
});

module.exports = mongoose.model('FollowCategory', FollowSchema);