import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Loader from './components/Loader';
import Itinerary from './components/Itinerary';

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white selection:bg-blue-500 selection:text-white">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] mb-2 tracking-tight">
              YatraAI : Your Travel Planner AI
            </h1>
            <div className="absolute -bottom-2 nav-link h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mt-6 leading-relaxed">
            Experience the future of travel.
            <span className="block text-blue-300 font-medium mt-1">Plan your perfect journey in seconds.</span>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {!itinerary && !loading && (
            <div className="flex justify-center">
              <InputForm setItinerary={setItinerary} setLoading={setLoading} />
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center min-h-[500px]">
              <Loader />
            </div>
          )}

          {itinerary && !loading && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setItinerary(null)}
                  className="glass-card px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group border-blue-500/30 hover:border-blue-500"
                >
                  <span className="text-xl group-hover:-rotate-180 transition-transform duration-500">↺</span>
                  <span className="font-medium tracking-wide">Plan New Trip</span>
                </button>
              </div>
              <Itinerary itinerary={itinerary} />
            </div>
          )}
        </div>
      </div>

      <footer className="relative z-10 text-center text-gray-500 py-8 mt-12 text-sm border-t border-white/5 backdrop-blur-sm">
        <p>Powered by <span className="text-blue-400 font-semibold">YatraAI</span><span className="text-purple-400 font-semibold"></span></p>
      </footer>
    </div>
  );
}

export default App;
