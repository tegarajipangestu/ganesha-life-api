var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var sendgrid = require('sendgrid')(process.env.SENDGRID_APIKEY);

var Schema = mongoose.Schema;

var publisherSchema = new Schema({
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
  publisher: String,
  rating: Number,
  type: Number,
  keterangan:String,
  perishable_token: String,
  persistence_token: String,
  confirmed: Number,
  imageUrl: String,
  value: Number,
  created_at: Date,
  updated_at: Date,
  token: String
});

publisherSchema.methods.sendEmailAfterRegistration = function(cb) {
  sendgrid.send({
    to: this.email,
    toname: this.name,
    from: 'noreply@ganeshalife.org',
    fromname: 'Ganesha Life',
    subject: 'Pendaftaran Publisher untuk Ganesha Life',
    text: 'Saudara ' + this.name + ', Terimakasih telah mendaftar ke aplikasi ini. Silahkan mengakses ' + process.env.URL_DEV + '/confirm?token=' + this.perishable_token
  }, cb);
};

publisherSchema.methods.sendEmailAfterConfirmation = function(cb) {
  var body = 'Registrasi publisher Ganesha Life berhasil. Saudara ' + this.name + ', silahkan login untuk menggunakan aplikasi Ganesha Life';
  var title = 'Registrasi publisher Ganesha Life berhasil';
  sendgrid.send({
    to: this.email,
    toname: this.name,
    from: 'noreply@ganeshalife.org',
    fromname: 'Ganesha Life',
    subject: title,
    text: body,
  }, cb);
};

publisherSchema.methods.sendForgotPassword = function(cb) {
  var body = 'Saudara ' + this.name + ', silahkan menuju tautan '+process.env.URL_DEV+'/changepassword?token='+this.perishable_token+' untuk menggunakan aplikasi Ganesha Life';
  var title = 'Reset password Ganesha Life';
  sendgrid.send({
    to: this.email,
    toname: this.name,
    from: 'noreply@ganeshalife.org',
    fromname: 'Ganesha Life',
    subject: title,
    text: body,
  }, cb);
};

var Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;