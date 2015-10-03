'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: String,
  info: String,
  completed: Boolean,
  createdDate: Date,
  updatedDate: Date   
});

module.exports = mongoose.model('Todo', TodoSchema);
