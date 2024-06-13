const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const catalogRoutes = require('./routes/catalogRoutes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};


connectDB();

app.use(express.json());
app.use(cors());

app.use('/catalog', catalogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
