const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Library', librarySchema);