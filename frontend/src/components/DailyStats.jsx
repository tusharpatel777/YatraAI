import React from 'react';
import { Footprints, Clock, Banknote } from 'lucide-react';

const DailyStats = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5">
                <Footprints size={16} className="text-emerald-400 mb-1" />
                <span className="text-white font-bold text-sm">{stats.total_distance_km} km</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Distance</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5">
                <Clock size={16} className="text-blue-400 mb-1" />
                <span className="text-white font-bold text-sm">{stats.total_travel_time}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Travel</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5">
                <Banknote size={16} className="text-yellow-400 mb-1" />
                <span className="text-white font-bold text-sm">₹{stats.estimated_cost}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Cost</span>
            </div>
        </div>
    );
};

export default DailyStats;
