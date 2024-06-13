const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;
