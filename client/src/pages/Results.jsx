import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiMail, HiPhone, HiGlobeAlt, HiShieldExclamation, HiCheckCircle, HiExternalLink, HiExclamationCircle, HiUserCircle } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [searchInfo, setSearchInfo] = useState(null);

    useEffect(() => {
        if (location.state?.results) {
            setData(location.state.results);
            setSearchInfo(location.state.searchInfo);
        }
    }, [location]);

    if (!data) return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
            <LoadingSpinner label="Decoding Intelligence Stream..." />
        </div>
    );

    const emailIntel = data.email_intelligence || {};
    const phoneIntel = data.phone_intelligence || {};
    const usernameIntel = data.username_intelligence || {};
    const newsIntel = data.name_intelligence?.articles || [];

    const hasEmailData = (emailIntel.abstract?.status === 'success') ||
        (emailIntel.hibp?.status === 'success') ||
        (emailIntel.gravatar?.status === 'success' && emailIntel.gravatar.avatar_exists);

    const hasPhoneData = (phoneIntel.abstract?.status === 'success');

    // Check if Sherlock found ANY accounts
    const hasSocialData = (usernameIntel.sherlock?.status === 'success' && usernameIntel.sherlock.found_accounts?.length > 0);

    const hasNewsData = (newsIntel && newsIntel.length > 0);

    const hasNoData = !hasEmailData && !hasPhoneData && !hasSocialData && !hasNewsData;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="fixed inset-0 glow-mesh" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Protocol Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => navigate('/search')}
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5 shadow-lg"
                        >
                            <HiArrowLeft className="text-xl" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">Intelligence Portal</h1>
                            <p className="text-[10px] font-mono text-neon-blue uppercase mt-1 tracking-[0.2em]">Target Identification: {searchInfo?.value || 'Active Vector'}</p>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-mono uppercase">Audit Level</span>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Unrestricted Deep Scan</span>
                    </div>
                </div>

                {hasNoData ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 text-center glass-card border-dashed border-white/10"
                    >
                        <HiExclamationCircle className="text-6xl text-slate-700 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-white uppercase tracking-widest">No Intelligence Nodes Found</h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto">The automated crawlers were unable to bridge any public metadata for this identifier across the open web.</p>
                        <button
                            onClick={() => navigate('/search')}
                            className="mt-8 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:border-neon-blue/50 transition-all uppercase tracking-widest"
                        >
                            Re-initialize Scan
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-12">
                        {/* 1. SOCIAL INFRASTRUCTURE (SHERLOCK) - Top Priority for User */}
                        {hasSocialData && (
                            <section className="space-y-6">
                                <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                                    <HiGlobeAlt className="text-2xl text-emerald-400" />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Social Media Nodes Discovered</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {usernameIntel.sherlock.found_accounts.map((account, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="glass-card p-4 border-white/5 bg-cyber-dark/40 flex justify-between items-center group hover:border-emerald-500/30 transition-all relative overflow-hidden"
                                        >
                                            <div className="overflow-hidden relative z-10">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <HiCheckCircle className="text-emerald-400 text-xs" />
                                                    <p className="text-xs font-black text-white uppercase tracking-wider">{account.platform}</p>
                                                </div>
                                                <p className="text-[9px] text-slate-500 font-mono truncate">{account.url}</p>
                                            </div>
                                            <a
                                                href={account.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all ml-4 relative z-10"
                                            >
                                                <HiExternalLink className="text-xl" />
                                            </a>
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 blur-2xl rounded-full" />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 2. EMAIL INTELLIGENCE */}
                        {hasEmailData && (
                            <section className="space-y-6">
                                <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                                    <HiMail className="text-2xl text-neon-blue" />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Email Meta-Discovery</h2>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Abstract/Validation */}
                                    <div className="glass-card p-6 border-white/5 bg-cyber-dark/40">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Integrity Audit</h3>
                                        {emailIntel.abstract?.status === 'success' ? (
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Network Origin', value: emailIntel.abstract.domain },
                                                    { label: 'Disposable Protocol', value: emailIntel.abstract.is_disposable ? 'YES' : 'NO' },
                                                    { label: 'MX Resolution', value: emailIntel.abstract.mx_records ? 'ACTIVE' : 'INACTIVE' },
                                                    { label: 'Reputation Score', value: `${emailIntel.abstract.reputation_score || 100}/100` }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/2 border border-white/5">
                                                        <span className="text-[10px] text-slate-400 uppercase font-mono">{item.label}</span>
                                                        <span className="text-xs text-neon-blue font-bold uppercase">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 border border-dashed border-white/5 rounded-xl">
                                                <span className="text-[9px] text-slate-600 font-mono uppercase italic">API Authorization Point Failed</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Breaches */}
                                    <div className="glass-card p-6 border-white/5 bg-cyber-dark/40">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Breach Propagation</h3>
                                        {emailIntel.hibp?.status === 'success' ? (
                                            <>
                                                <div className="flex items-center space-x-4 mb-4 bg-white/2 p-3 rounded-xl border border-white/5">
                                                    <div className={`p-3 rounded-lg ${emailIntel.hibp.breach_count > 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                                        <HiShieldExclamation className="text-2xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-black text-white">{emailIntel.hibp.breach_count}</p>
                                                        <p className="text-[9px] text-slate-500 uppercase font-black">Identified Leaks</p>
                                                    </div>
                                                </div>
                                                <div className="max-h-32 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                                                    {emailIntel.hibp.breaches?.map((b, i) => (
                                                        <div key={i} className="text-[9px] text-slate-400 flex justify-between bg-white/2 p-2 rounded border border-white/5">
                                                            <span className="uppercase font-bold truncate max-w-[120px]">{b.name}</span>
                                                            <span className="font-mono text-slate-500">{b.breachDate}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-6 border border-dashed border-white/5 rounded-xl">
                                                <span className="text-[9px] text-slate-600 font-mono uppercase italic">HIBP Node Unavailable</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Identity/Avatar */}
                                    <div className="glass-card p-6 border-white/5 bg-cyber-dark/40 flex flex-col items-center justify-center relative overflow-hidden">
                                        <h3 className="absolute top-6 left-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Digital Identifier</h3>
                                        {emailIntel.gravatar?.avatar_exists ? (
                                            <div className="flex flex-col items-center space-y-4 pt-4">
                                                <div className="relative">
                                                    <img
                                                        src={emailIntel.gravatar.avatar_url}
                                                        alt="Identifier Avatar"
                                                        className="w-24 h-24 rounded-2xl border-2 border-neon-blue/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] object-cover"
                                                    />
                                                    <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 rounded-lg shadow-lg">
                                                        <HiCheckCircle className="text-white text-lg" />
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest bg-emerald-400/10 px-4 py-1.5 rounded-full">Active Avatar Found</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center opacity-20 py-8 grayscale">
                                                <HiUserCircle className="text-7xl mb-2" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">No Profile Hash Found</p>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl rounded-full" />
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 3. PHONE INTELLIGENCE */}
                        {hasPhoneData && (
                            <section className="space-y-6">
                                <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                                    <HiPhone className="text-2xl text-neon-purple" />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Telephony Vector Analysis</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Network Provider', value: phoneIntel.abstract.carrier, icon: HiGlobeAlt },
                                        { label: 'Hardware Spec', value: phoneIntel.abstract.line_type, icon: HiUserCircle },
                                        { label: 'Geo-Location', value: phoneIntel.abstract.country, icon: HiGlobeAlt },
                                        { label: 'Verified Status', value: phoneIntel.abstract.valid ? 'ACTIVE' : 'INACTIVE', color: phoneIntel.abstract.valid ? 'text-emerald-400' : 'text-red-400' }
                                    ].map((item, i) => (
                                        <div key={i} className="glass-card p-5 border-white/5 bg-cyber-dark/40 group hover:border-neon-purple/30 transition-all">
                                            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-2 font-black italic">{item.label}</p>
                                            <p className={`text-sm font-black tracking-widest ${item.color || 'text-white'} group-hover:text-neon-purple transition-colors`}>{item.value || 'DECRYPTING...'}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {/* System Disclaimer */}
                <div className="mt-20 text-center border-t border-white/5 pt-10">
                    <p className="text-[10px] text-slate-600 font-mono uppercase font-black tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                        {data.disclaimer}
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-4 opacity-20">
                        <div className="h-px w-10 bg-slate-600" />
                        <span className="text-[8px] font-mono text-slate-600">END OF REPORT</span>
                        <div className="h-px w-10 bg-slate-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
