import React, { useState } from 'react';
import { Plane, Calendar, Wallet, Users, LayoutGrid, Sparkles, Clock, Activity, Train } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const InputForm = ({ setItinerary, setLoading }) => {
    const [formData, setFormData] = useState({
        destination: '',
        duration: 3,
        budget: 'Medium',
        travelType: 'Couple',
        interests: [],
        arrivalTime: '10:00',
        pace: 'Medium',
        transportMode: ['Cab', 'Walk']
    });

    const interestsOptions = ['History', 'Food', 'Nature', 'Shopping', 'Adventure', 'Relaxation', 'Nightlife', 'Art'];
    const transportOptions = ['Cab', 'Metro', 'Bus', 'Walk', 'Rental'];

    const handleInterestChange = (interest) => {
        setFormData((prev) => {
            if (prev.interests.includes(interest)) {
                return { ...prev, interests: prev.interests.filter(i => i !== interest) };
            }
            return { ...prev, interests: [...prev.interests, interest] };
        });
    };

    const handleTransportChange = (mode) => {
        setFormData((prev) => {
            if (prev.transportMode.includes(mode)) {
                return { ...prev, transportMode: prev.transportMode.filter(m => m !== mode) };
            }
            return { ...prev, transportMode: [...prev.transportMode, mode] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setItinerary(null);
        try {
            const response = await axios.post('http://localhost:5000/api/itinerary/generate', {
                ...formData,
                interests: formData.interests.length > 0 ? formData.interests.join(', ') : 'General Sightseeing',
                transportMode: formData.transportMode.join(', ')
            });
            setItinerary(response.data.itinerary);
        } catch (error) {
            console.error('Error generating itinerary:', error);
            alert('Failed to generate itinerary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 rounded-3xl w-full max-w-2xl mx-auto relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center gap-3">
                <Sparkles className="text-purple-400" /> Plan Your Adventure
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Destination */}
                <div className="relative group">
                    <Plane className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-300 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Where to? (e.g., Tokyo, Paris)"
                        className="glass-input w-full pl-12 p-3.5 rounded-xl outline-none transition-all duration-300"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        required
                    />
                </div>

                {/* Duration & Budget */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-4 text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
                        <input
                            type="number"
                            min="1"
                            max="15"
                            placeholder="Days"
                            className="glass-input w-full pl-12 p-3.5 rounded-xl outline-none transition-all duration-300"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />
                    </div>
                    <div className="relative group">
                        <Wallet className="absolute left-4 top-4 text-pink-400 group-focus-within:text-pink-300 transition-colors" size={20} />
                        <select
                            className="glass-input w-full pl-12 p-3.5 rounded-xl outline-none transition-all duration-300 appearance-none cursor-pointer"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        >
                            <option value="Low" className="bg-gray-900">Low Budget</option>
                            <option value="Medium" className="bg-gray-900">Medium</option>
                            <option value="Luxury" className="bg-gray-900">Luxury</option>
                        </select>
                    </div>
                </div>

                {/* Arrival Time & Pace */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                        <Clock className="absolute left-4 top-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" size={20} />
                        <input
                            type="time"
                            className="glass-input w-full pl-12 p-3.5 rounded-xl outline-none transition-all duration-300 cursor-pointer text-gray-300"
                            value={formData.arrivalTime}
                            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                        />
                    </div>
                    <div className="relative group">
                        <Activity className="absolute left-4 top-4 text-green-400 group-focus-within:text-green-300 transition-colors" size={20} />
                        <select
                            className="glass-input w-full pl-12 p-3.5 rounded-xl outline-none transition-all duration-300 appearance-none cursor-pointer"
                            value={formData.pace}
                            onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                        >
                            <option value="Relaxed" className="bg-gray-900">Relaxed 😌</option>
                            <option value="Medium" className="bg-gray-900">Balanced ⚖️</option>
                            <option value="Packed" className="bg-gray-900">Packed 🏃</option>
                        </select>
                    </div>
                </div>

                {/* Transport Preference */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                        <Train size={16} className="text-orange-400" /> Preferred Transport
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                        {transportOptions.map((mode) => (
                            <motion.button
                                key={mode}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTransportChange(mode)}
                                className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 ${formData.transportMode.includes(mode)
                                        ? 'bg-orange-500/20 text-orange-200 border-orange-500/50 shadow-sm'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {mode}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Interests */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                        <LayoutGrid size={16} className="text-blue-400" /> Interests
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                        {interestsOptions.map((interest) => (
                            <motion.button
                                key={interest}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleInterestChange(interest)}
                                className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 ${formData.interests.includes(interest)
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {interest}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 animate-gradient"
                >
                    Generate Personalized Trip 🚀
                </motion.button>
            </form>
        </motion.div>
    );
};

export default InputForm;
