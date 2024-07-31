const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  ISBN: String,
  isBorrowed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);