var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Term = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Term', Term);
