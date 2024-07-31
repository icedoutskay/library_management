const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  id: String,
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('User', userSchema);