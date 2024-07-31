const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add', bookController.addBook);
router.get('/:ISBN', bookController.getBook);
router.get('/available', bookController.getAvailableBooks);

module.exports = router;