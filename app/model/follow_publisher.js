var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var FollowSchema   = new Schema({
    publisherId: String,
    userId: String
});

module.exports = mongoose.model('FollowPublisher', FollowSchema);