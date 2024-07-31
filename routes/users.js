const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/:userId/borrow/:ISBN', userController.borrowBook);
router.post('/:userId/return/:ISBN', userController.returnBook);

module.exports = router;