var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Option = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Option', Option);
