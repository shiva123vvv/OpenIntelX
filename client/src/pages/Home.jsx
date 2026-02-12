import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiShieldCheck, HiArrowRight, HiLockClosed, HiTerminal, HiSearch, HiIdentification, HiEye, HiGlobe, HiDatabase } from 'react-icons/hi';

const Home = () => {
    return (
        <div className="relative min-h-screen pt-20 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
            <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-xs font-black tracking-[0.3em] uppercase mb-8 backdrop-blur-md"
                    >
                        <HiShieldCheck className="mr-2 text-base" />
                        Intelligence Protocol Alpha-6
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-none"
                    >
                        THE FUTURE OF<br />
                        <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue bg-clip-text text-transparent italic">
                            ETHICAL OSINT
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-medium leading-relaxed"
                    >
                        Bridge multiple public data nodes to aggregate digital footprints into a single, actionable intelligence report. Built for ethical investigators and security researchers.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <Link
                            to="/search"
                            className="group relative inline-flex items-center px-10 py-5 bg-neon-blue text-cyber-darker text-sm font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Start Scan Protocol
                            <HiArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </Link>

                        <Link
                            to="/history"
                            className="inline-flex items-center px-10 py-5 text-white text-sm font-black uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/5 backdrop-blur-sm transition-all"
                        >
                            Past Investigations
                        </Link>
                    </motion.div>
                </div>

                {/* Intelligence Modules */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {[
                        { icon: HiIdentification, title: "Identity", desc: "Whois register and Clearbit identity enrichment." },
                        { icon: HiSearch, title: "Email Intel", desc: "Hunter.io validation and Reputation scoring." },
                        { icon: HiTerminal, title: "Phone Scan", desc: "NumVerify carrier and Twilio line-type audit." },
                        { icon: HiGlobe, title: "Social Nodes", desc: "Sherlock handle discovery across 400+ platforms." }
                    ].map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="glass-card p-8 group border-white/5 hover:border-neon-blue/30"
                        >
                            <div className="w-12 h-12 rounded-lg bg-cyber-darker flex items-center justify-center mb-6 text-neon-blue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                                <m.icon className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{m.title}</h3>
                            <p className="text-slate-500 text-sm font-medium">{m.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Ethical Safeguard Section */}
                <div className="relative mt-32 glass-card p-12 border-neon-blue/20 overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <HiDatabase className="text-9xl text-neon-blue" />
                    </div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">Ethical Safeguards</h2>
                            <ul className="space-y-4">
                                {[
                                    "Only publicly available data is queried in real-time.",
                                    "Clear disclaimers to prevent investigative misuse.",
                                    "Secure query logging for departmental accountability.",
                                    "Strict adherence to no-private-scraping protocols."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start space-x-3 text-slate-400">
                                        <HiShieldCheck className="text-neon-blue mt-1 flex-shrink-0" />
                                        <span className="text-sm font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden lg:block">
                            <div className="p-8 rounded-2xl bg-cyber-darker/50 border border-white/5 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <span className="text-[10px] font-black text-neon-blue uppercase tracking-widest">Protocol Impact Index</span>
                                    <span className="text-[10px] text-slate-600 font-mono">v1.2.0</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">Investigative Speed</span>
                                        <span className="text-xs text-emerald-400 font-bold">+240%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">Data Connectivity</span>
                                        <span className="text-xs text-neon-blue font-bold">54 Nodes</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">Ethical Scoring</span>
                                        <span className="text-xs text-neon-purple font-bold">A+ Certified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
