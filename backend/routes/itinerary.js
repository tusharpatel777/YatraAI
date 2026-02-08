const express = require('express');
const router = express.Router();
const { generateItinerary } = require('../services/gemini');

router.post('/generate', async (req, res) => {
    const { destination, duration, budget, travelType, interests, arrivalTime, pace, transportMode } = req.body;
    if (!destination || !duration || !budget || !travelType) {
        console.error('Missing required fields:', { destination, duration, budget, travelType });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const itinerary = await generateItinerary(destination, duration, budget, travelType, interests, arrivalTime, pace, transportMode);
        res.json({ itinerary });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
