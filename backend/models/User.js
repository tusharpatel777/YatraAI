const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Simple implementation, should be hashed in production
    savedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
