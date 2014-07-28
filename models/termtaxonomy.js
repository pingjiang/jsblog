var mongoose = require('mongoose');
var tree = require('mongoose-tree');
var Schema = mongoose.Schema;

var Termtaxonomy = new Schema({
  term: {
    type: Schema.Types.ObjectId,
    ref: 'Term'
  },
  taxonomy: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  }
});

Termtaxonomy.plugin(tree);
module.exports = mongoose.model('Termtaxonomy', Termtaxonomy);
