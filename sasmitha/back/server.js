const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');

let libraryCatalog = [];
let nextId = 1;

app.use(express.json());
app.use(cors());

// Get all library catalog entries
app.get('/catalog', (req, res) => {
  res.json(libraryCatalog);
});

// Get a specific library catalog entry by id
app.get('/catalog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = libraryCatalog.find(entry => entry.id === id);
  if (!entry) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  res.json(entry);
});

// Create a new library catalog entry
app.post('/catalog', (req, res) => {
  const { title, author, genre } = req.body;
  const newEntry = { id: nextId++, title, author, genre };
  libraryCatalog.push(newEntry);
  res.status(201).json(newEntry);
});

// Update an existing library catalog entry by id
app.put('/catalog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, genre } = req.body;
  const index = libraryCatalog.findIndex(entry => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  const updatedEntry = { id, title, author, genre };
  libraryCatalog[index] = updatedEntry;
  res.json(updatedEntry);
});

// Delete an existing library catalog entry by id
app.delete('/catalog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libraryCatalog.findIndex(entry => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  libraryCatalog.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
