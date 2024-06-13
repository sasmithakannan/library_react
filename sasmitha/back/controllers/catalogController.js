const Catalog = require('../models/catalogModel');

// Get all catalog entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Catalog.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific catalog entry by id
exports.getEntryById = async (req, res) => {
  try {
    const entry = await Catalog.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new catalog entry
exports.createEntry = async (req, res) => {
  const { title, author, genre } = req.body;
  const newEntry = new Catalog({ title, author, genre });
  try {
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing catalog entry by id
exports.updateEntry = async (req, res) => {
  try {
    const entry = await Catalog.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    entry.title = req.body.title;
    entry.author = req.body.author;
    entry.genre = req.body.genre;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Catalog.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    await entry.remove();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Error deleting entry', error: error.message });
  }
};

