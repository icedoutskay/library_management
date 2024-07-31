const User = require('../models/User');
const Book = require('../models/Book');

async function registerUser(req, res) {
  try {
    const { name, id } = req.body;
    const newUser = new User({ name, id });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function borrowBook(req, res) {
  try {
    const { userId, ISBN } = req.params;

    // Check if user can borrow more books
    const user = await User.findById(userId).populate('borrowedBooks');
    if (user.borrowedBooks.length >= 3) {
      return res.status(400).json({ message: 'User has already borrowed maximum books' });
    }

    // Find book and borrow if available
    const book = await Book.findOne({ ISBN, isBorrowed: false });
    if (!book) {
      return res.status(404).json({ message: 'Book not found or already borrowed' });
    }

    // Update book status and user's borrowedBooks array
    book.isBorrowed = true;
    await book.save();
    user.borrowedBooks.push(book._id);
    await user.save();

    res.status(200).json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function returnBook(req, res) {
  try {
    const { userId, ISBN } = req.params;

    // Find user and update borrowedBooks array
    const user = await User.findById(userId).populate('borrowedBooks');
    const borrowedBookIndex = user.borrowedBooks.findIndex(book => book.ISBN === ISBN);

    if (borrowedBookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in user\'s borrowed list' });
    }

    // Find the book and update its status
    const book = await Book.findOne({ ISBN });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.isBorrowed = false;
    await book.save();

    // Remove book from user's borrowed list
    user.borrowedBooks.splice(borrowedBookIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  borrowBook,
  returnBook
};