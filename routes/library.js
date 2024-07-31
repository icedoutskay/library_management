const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.post('/:libraryId/register/:userId', libraryController.registerMember);
router.post('/:libraryId/addBook', libraryController.addNewBook);

module.exports = router;