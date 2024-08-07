const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const libraryRouter = require('./routes/library');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library', {

 
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Routes
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/libraries', libraryRouter); // Add library routes

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});