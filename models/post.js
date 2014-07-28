var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String
  },
  excerpt: {
    type: String,
    max: 300
  },
  url: {
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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  metas: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('Post', Post);
