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
  confirmed: Number,
  imageUrl: String,
  value: Number,
  created_at: Date,
  updated_at: Date,
  token: String
});

userSchema.methods.sendEmailAfterRegistration = function(cb) {
  sendgrid.send({
    to: this.email,
    toname: this.name,
    from: 'noreply@ganeshalife.org',
    fromname: 'Ganesha Life',
    subject: 'Pendaftaran User untuk Ganesha Life',
    text: 'Saudara ' + this.name + ', Terimakasih telah mendaftar ke aplikasi ini. Silahkan mengakses ' + process.env.URL_DEV + '/confirm?token=' + this.perishable_token
  }, cb);
};

userSchema.methods.sendEmailAfterConfirmation = function(cb) {
  var body = 'Registrasi user Ganesha Life berhasil. Saudara ' + this.name + ', silahkan login untuk menggunakan aplikasi Ganesha Life';
  var title = 'Registrasi user Ganesha Life berhasil';
  sendgrid.send({
    to: this.email,
    toname: this.name,
    from: 'noreply@ganeshalife.org',
    fromname: 'Ganesha Life',
    subject: title,
    text: body,
  }, cb);
};

var User = mongoose.model('User', userSchema);

module.exports = User;