var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  password: {
    type: String,
    required: true
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
    type: Number
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

module.exports = mongoose.model('User', User);
