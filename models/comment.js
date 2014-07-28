var mongoose = require('mongoose');
var tree = require('mongoose-tree');
var Schema = mongoose.Schema;

var Comment = new Schema({
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  authorEmail: {
    type: String,
    required: true,
    trim: true
  },
  authorIP: {
    type: String,
    required: true,
    trim: true
  },
  authorUrl: {
    type: String,
    required: true,
    trim: true
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
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  }
});

Comment.plugin('tree');
module.exports = mongoose.model('Comment', Comment);
