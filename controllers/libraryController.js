const Library = require('../models/Library');
const User = require('../models/User');
const Book = require('../models/Book');

async function registerMember(req, res) {
  try {
    const { libraryId, userId } = req.params;

    // Find library and user
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add user to library members
    library.members.push(user._id);
    await library.save();

    res.status(200).json({ message: 'User registered to library successfully', library });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addNewBook(req, res) {
  try {
    const { libraryId } = req.params;
    const { title, author, ISBN } = req.body;

    // Find library and create new book
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    const newBook = new Book({ title, author, ISBN });
    await newBook.save();

    // Add book to library collection
    library.books.push(newBook._id);
    await library.save();

    res.status(201).json({ message: 'Book added to library successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registerMember,
  addNewBook
};