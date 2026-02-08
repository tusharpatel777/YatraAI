import React from 'react';
import { MapPin, Clock, Calendar, CloudSun } from 'lucide-react';
import { motion } from 'framer-motion';
import DailyStats from './DailyStats';
import TransportCard from './TransportCard';

const Itinerary = ({ itinerary }) => {
    if (!itinerary) return null;

    // Handle V1 vs V2 structure
    const days = Array.isArray(itinerary) ? itinerary : itinerary.days;
    const tripDetails = itinerary.trip_details || {};

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {tripDetails.destination ? `Your Trip to ${tripDetails.destination} 🗺️` : 'Your Dream Journey 🗺️'}
                </h2>
                {tripDetails.summary && (
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto italic">"{tripDetails.summary}"</p>
                )}
            </motion.div>

            <div className="space-y-12">
                {days.map((dayPlan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                        {/* Day Header */}
                        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-6 backdrop-blur-md">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
                                        <Calendar className="text-blue-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white tracking-wide">Day {dayPlan.day}</h3>
                                        <p className="text-blue-200 text-sm">{dayPlan.theme}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {dayPlan.weather_forecast && (
                                        <div className="flex items-center gap-2 text-yellow-300 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            <CloudSun size={14} /> {dayPlan.weather_forecast}
                                        </div>
                                    )}
                                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium backdrop-blur-sm">
                                        {dayPlan.activities?.filter(a => a.type === 'visit').length || 0} Experiences
                                    </span>
                                </div>
                            </div>

                            {/* Daily Stats */}
                            {dayPlan.stats && <DailyStats stats={dayPlan.stats} />}
                        </div>

                        <div className="p-6 md:p-8 space-y-2 relative">
                            {/* Vertical Line for timeline */}
                            <div className="absolute left-9 md:left-11 top-6 bottom-10 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent"></div>

                            {dayPlan.activities?.map((activity, actIndex) => (
                                <React.Fragment key={actIndex}>
                                    {/* Render Transport Segment if type is 'travel' */}
                                    {activity.type === 'travel' && (
                                        <TransportCard
                                            from={activity.from}
                                            to={activity.to}
                                            mode={activity.mode}
                                            duration={activity.duration}
                                            distance={activity.distance_km}
                                            cost={activity.cost}
                                        />
                                    )}

                                    {/* Render Visit/Activity if type is 'visit' or undefined (legacy) */}
                                    {(activity.type === 'visit' || !activity.type) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (actIndex * 0.1) }}
                                            className="flex gap-6 relative py-4"
                                        >
                                            <div className="flex-shrink-0 mt-1 relative z-10 w-0">
                                                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] border-2 border-white/20 mt-2 ml-[0.85rem] md:ml-[1.35rem]"></div>
                                            </div>

                                            <div className="flex-grow glass-card p-5 rounded-2xl hover:bg-white/10 transition-colors duration-300 ml-8 md:ml-10">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                                                    <h4 className="font-bold text-white text-lg md:text-xl tracking-wide flex items-center gap-2">
                                                        <MapPin size={18} className="text-pink-400" />
                                                        {activity.place}
                                                    </h4>
                                                    <div className="flex items-center text-blue-300 text-xs font-semibold bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                                                        <Clock size={12} className="mr-2" />
                                                        {activity.time}
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">{activity.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-block bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30 uppercase tracking-wider font-bold">
                                                        {activity.category}
                                                    </span>
                                                    {activity.ticket_price !== undefined && (
                                                        <span className="inline-block bg-yellow-500/10 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-500/20 font-mono">
                                                            {activity.ticket_price === 0 ? 'Free' : `₹${activity.ticket_price}`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Itinerary;
