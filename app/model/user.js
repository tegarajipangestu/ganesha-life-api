var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var sendgrid = require('sendgrid')(process.env.SENDGRID_APIKEY);

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  perishable_token: String,
  persistence_token: String,
  imageUrl: String,
  value: Number,
  created_at: Date,
  updated_at: Date
});

userSchema.post('save', function(next) {
  console.log();
    sendgrid.send({
      to: this.email,
      toname: this.name,
      from: 'noreply@ganeshalife.org',
      fromname: 'Ganesha Life',
      subject: 'Pendaftaran User untuk Ganesha Life',
      text: 'Saudara '+this.name+', Terimakasih telah mendaftar ke aplikasi ini. Silahkan mengakses '
      +process.env.URL_DEV+'/confirm?token='+this.perishable_token
    }, function(err, json) {
      if (err) {
        return console.error(err);
      }
    });  
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;