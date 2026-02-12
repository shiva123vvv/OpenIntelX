import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiClock, HiShieldCheck, HiSearch, HiExclamation } from 'react-icons/hi';
import { getSearchHistory } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getSearchHistory();
                setHistory(data);
            } catch (err) {
                setError('Failed to load search audit logs.');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="fixed inset-0 glow-mesh" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex items-center space-x-4"
                >
                    <div className="p-3 bg-neon-purple/10 rounded-xl border border-neon-purple/20">
                        <HiClock className="text-3xl text-neon-purple" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Intelligence Logs</h1>
                        <p className="text-slate-400 mt-1">Immutable audit trail of previous identification scans.</p>
                    </div>
                </motion.div>

                {loading ? (
                    <LoadingSpinner label="Accessing Audit Database..." />
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card p-12 text-center border-red-500/20"
                    >
                        <HiExclamation className="mx-auto mb-4 h-12 w-12 text-red-500" />
                        <p className="text-red-400 font-medium">{error}</p>
                    </motion.div>
                ) : history.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card p-20 text-center"
                    >
                        <HiSearch className="mx-auto mb-4 h-16 w-16 text-slate-700 opacity-20" />
                        <p className="text-xl text-slate-500 font-medium">Clear Log</p>
                        <p className="text-sm text-slate-600 mt-2">No intelligence data has been processed by this terminal.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid gap-6"
                    >
                        {history.map((item, index) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                className="glass-card group p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-neon-blue/30 transition-all cursor-default"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-4 rounded-xl border transition-colors ${item.riskScore >= 70 ? "bg-red-500/10 border-red-500/20 text-red-400" :
                                            item.riskScore >= 40 ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" :
                                                "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        }`}>
                                        <HiShieldCheck className="text-2xl" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-1">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 py-0.5 px-2 bg-white/5 rounded">
                                                {item.searchType}
                                            </span>
                                            <span className="text-xs text-slate-600 font-mono">
                                                {new Date(item.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors font-mono truncate max-w-md">
                                            {item.searchValue}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8 md:border-l border-white/10 md:pl-8">
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">Risk Score</p>
                                        <div className="flex items-baseline space-x-1">
                                            <span className={`text-2xl font-bold font-mono ${item.riskScore >= 70 ? "text-red-500" :
                                                    item.riskScore >= 40 ? "text-yellow-500" :
                                                        "text-emerald-500"
                                                }`}>{item.riskScore}</span>
                                            <span className="text-slate-600 font-mono text-xs">/100</span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-px h-10 bg-white/5" />
                                    <div className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase border border-white/10 text-slate-500 tracking-tighter">
                                        Verified Scan
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
