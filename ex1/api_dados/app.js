const express = require('express');
const mongoose = require('mongoose');
const app = express();
const repairRouter = require('./routes/repair');

// Connect to MongoDB
const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/autoRepair';
mongoose.connect(mongoURL)
    .then(() => console.log('MongoDB connected to autoRepair'))
    .catch(err => {
      console.error('MongoDB connection failed:', err);
      process.exit(1);
    });

app.use(express.json());

// Routes
app.use('/repairs', repairRouter);

const PORT = 16025;
app.listen(PORT, () => {
  console.log(`Data API is running on port ${PORT}`);
});
