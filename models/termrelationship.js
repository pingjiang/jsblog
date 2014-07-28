var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Termrelationship = new Schema({
  objectId: {
    type: Schema.Types.ObjectId
  },
  termTaxonomyId: {
    type: Schema.Types.ObjectId,
    ref: 'Termtaxonomy'
  },
  termOrder: {
    type: Number
  }
});

module.exports = mongoose.model('Termrelationship', Termrelationship);
