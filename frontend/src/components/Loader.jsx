import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Sparkles } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full animate-pulse"></div>

            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500 opacity-50"
                ></motion.div>

                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-2 border-transparent border-b-pink-500 border-l-cyan-500 opacity-50"
                ></motion.div>

                {/* Center Plane */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        <Plane size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 text-center space-y-3"
            >
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400 flex items-center justify-center gap-2">
                    Crafting Reality <Sparkles size={18} className="text-yellow-400" />
                </h3>
                <p className="text-blue-200/60 font-mono text-sm tracking-widest uppercase">
                    Analyzing Routes • Checking Availability • Optimizing Fun
                </p>

                <div className="flex gap-1 justify-center mt-4">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                        ></motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Loader;
