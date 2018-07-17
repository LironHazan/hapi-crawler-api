'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const page = new Schema({
  title: {type: String, required: true},
  depth: {type: Number, required: true},
  url: {type: String, required: true},
  links: {type: [String], required: true}
});

module.exports = mongoose.model('Page', page, 'pages');