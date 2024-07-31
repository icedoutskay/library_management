const Book = require('../models/Book');

async function addBook(req, res) {
  try {
    const { title, author, ISBN } = req.body;
    const newBook = new Book({ title, author, ISBN });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBook(req, res) {
  try {
    const { ISBN } = req.params;
    const book = await Book.findOne({ ISBN });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAvailableBooks(req, res) {
  try {
    const books = await Book.find({ isBorrowed: false });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addBook,
  getBook,
  getAvailableBooks
};