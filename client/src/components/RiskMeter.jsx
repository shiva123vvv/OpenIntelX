import React from 'react';
import { motion } from 'framer-motion';

const RiskMeter = ({ score = 0 }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getRiskColor = (s) => {
        if (s < 30) return '#22c55e'; // Green
        if (s < 70) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    const getRiskLabel = (s) => {
        if (s < 30) return 'LOW RISK';
        if (s < 70) return 'MEDIUM RISK';
        return 'HIGH RISK';
    };

    const color = getRiskColor(score);

    return (
        <div className="relative flex flex-col items-center justify-center p-6 glass-card border-neon-blue/20">
            <div className="relative w-48 h-48">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-white/5"
                    />
                    {/* Animated Progress Circle */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke={color}
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: strokeDashoffset }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        strokeLinecap="round"
                        style={{
                            filter: `drop-shadow(0 0 8px ${color})`
                        }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-bold font-mono text-white"
                    >
                        {score}%
                    </motion.span>
                    <span className="text-[10px] text-slate-500 tracking-[0.2em] font-medium uppercase mt-1">
                        Exposure Level
                    </span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-6 px-6 py-2 rounded-full font-bold text-xs tracking-widest border"
                style={{
                    borderColor: `${color}40`,
                    backgroundColor: `${color}10`,
                    color: color,
                    boxShadow: `0 0 20px ${color}20`
                }}
            >
                {getRiskLabel(score)}
            </motion.div>
        </div>
    );
};

export default RiskMeter;
