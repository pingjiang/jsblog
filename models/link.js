var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Link = new Schema({
  target: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  rel: {
    type: String
  }
});

module.exports = mongoose.model('Link', Link);
