import React from 'react';
import { Car, Footprints, Train, Bus, ArrowDown } from 'lucide-react';

const TransportCard = ({ from, to, mode, duration, distance, cost }) => {
    const getIcon = () => {
        switch (mode?.toLowerCase()) {
            case 'walk': return <Footprints size={16} />;
            case 'metro': return <Train size={16} />;
            case 'bus': return <Bus size={16} />;
            default: return <Car size={16} />;
        }
    };

    return (
        <div className="relative py-4 pl-8 md:pl-10">
            {/* Dotted Line */}
            <div className="absolute left-[1.35rem] md:left-[1.85rem] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-600/50"></div>

            <div className="bg-gray-800/40 border border-white/5 rounded-xl p-3 flex items-center justify-between gap-4 backdrop-blur-sm max-w-sm">
                <div className="flex items-center gap-3 text-gray-300">
                    <div className="bg-gray-700/50 p-2 rounded-lg text-blue-300">
                        {getIcon()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{mode} Transfer</span>
                        <span className="text-xs text-gray-500">{duration} • {distance} km</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-yellow-400/80 text-xs font-mono">₹{cost}</span>
                </div>
            </div>
        </div>
    );
};

export default TransportCard;
