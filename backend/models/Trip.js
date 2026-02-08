const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: String, enum: ['Low', 'Medium', 'Luxury'], required: true },
    travelType: { type: String, enum: ['Solo', 'Couple', 'Family', 'Friends'], required: true },
    itinerary: { type: Array, required: true }, // Storing JSON structure directly
    hotels: { type: Array },
    activities: { type: Array },
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
