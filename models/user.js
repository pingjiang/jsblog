var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Validator = require('validator').Validator, val = new Validator();
var bcrypt = require('bcrypt');

var User = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  niceName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  salt: {
    type: String
  },
  passwordHash: {
    type: String
  },
  activationKey: {
    type: String
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now 
  },
  status: {
    type: Number,
    default: 0
  },
  url: {
    type: String
  },
  metas: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: Schema.Types.Mixed
  }]
});

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

User.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(value) {
  var parts = value.split(' ');
  
  if (parts.length > 0) {
    this.firstName = parts[0];
  }
  
  if (parts.length > 1) {
    this.lastName = parts[1];
  }
  
  return this;
})


User.virtual('password').get(function() {
  return this._password;
}).set(function(value) {
  this._password = value;
  this.salt = bcrypt.genSaltSync(12);
  this.passwordHash = bcrypt.hashSync(value, this.salt);
});
 
User.virtual('passwordConfirmation').get(function() {
  return this._passwordConfirmation;
}).set(function(value) {
  this._passwordConfirmation = value;
});
 
User.path('passwordHash').validate(function(v) {
  if (this._password || this._passwordConfirmation) {
    // if (!val.check(this._password).min(6)) {
    //   this.invalidate('password', 'must be at least 6 characters.');
    // }
    if (this._password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'must match confirmation.');
    }
  }
  
  if (this.isNew && !this._password) {
    this.invalidate('password', 'required');
  }
}, null);

module.exports = mongoose.model('User', User);
