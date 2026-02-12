import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ label = "Gathering Intelligence..." }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-20">
            <div className="relative w-24 h-24">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-t-neon-blue border-r-transparent border-b-white/5 border-l-transparent rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                />

                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-2 border-t-neon-purple border-r-transparent border-b-white/5 border-l-transparent rounded-full shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                />

                {/* Center Glow */}
                <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-4 h-4 bg-neon-blue rounded-full blur-[4px]" />
                </motion.div>
            </div>

            <div className="text-center">
                <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
                    {label}
                </p>
                <p className="text-slate-500 text-xs mt-2 font-mono italic">
                    Accessing global data nodes...
                </p>
            </div>

            {/* Progress placeholder/bar */}
            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-full w-1/2 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                />
            </div>
        </div>
    );
};

export default LoadingSpinner;
