const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.get('/', catalogController.getAllEntries);
router.get('/:id', catalogController.getEntryById);
router.post('/', catalogController.createEntry);
router.put('/:id', catalogController.updateEntry);
router.delete('/:id', catalogController.deleteEntry);

module.exports = router;
