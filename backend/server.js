require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error (Non-fatal, app will work without DB):', err.message);
        // Do not exit process,
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/itinerary', require('./routes/itinerary'));
// app.use('/api/trips', require('./routes/trips')); // Placeholder

app.get('/', (req, res) => {
    res.send('AI Travel Planner API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
