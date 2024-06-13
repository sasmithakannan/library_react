import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const LibraryCatalog = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', author: '', genre: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/catalog');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        await axios.put(`http://localhost:5000/catalog/${entries[editIndex]._id}`, newEntry);
        const updatedEntries = [...entries];
        updatedEntries[editIndex] = newEntry;
        setEntries(updatedEntries);
        setEditIndex(null);
      } else {
        const response = await axios.post('http://localhost:5000/catalog', newEntry);
        setEntries([...entries, response.data]);
      }
      setNewEntry({ title: '', author: '', genre: '' });
    } catch (error) {
      console.error('Error adding/editing entry:', error);
    }
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setNewEntry({ title: entry.title, author: entry.author, genre: entry.genre });
    setEditIndex(index);
  };

  const handleDelete = (id, index) => {
    axios.delete(`http://localhost:5000/catalog/${id}`)
      .then(() => {
        const updatedEntries = [...entries];
        updatedEntries.splice(index, 1);
        setEntries(updatedEntries);
      })
      .catch(error => console.error('Error deleting entry:', error));
  };
  

  return (
    <div className='container'>
      <h1>Library Catalog 📒</h1>
      <div>
        <h2>{editIndex !== null ? 'Edit Entry' : 'Add New Entry'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newEntry.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newEntry.author}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={newEntry.genre}
            onChange={handleInputChange}
          />
          <button type="submit">{editIndex !== null ? 'Edit Entry' : 'Add Entry'}</button>
        </form>
      </div>
      <div className='one'>
        <ul>
          {entries.map((entry, index) => (
            <li key={entry._id}>
              <strong>{entry.title}</strong> by {entry.author} - Genre: {entry.genre}
              <div className='three'>
                <button onClick={() => handleEdit(index)}>Edit✏️</button>
                <button onClick={() => handleDelete(entry.id, index)}>Delete❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LibraryCatalog;
