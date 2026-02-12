import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail, HiPhone, HiUser, HiPhotograph, HiChip, HiLightningBolt } from 'react-icons/hi';
import ImageUploader from './ImageUploader';

const SearchCard = ({ onSearch, isLoading }) => {
    const [searchType, setSearchType] = useState('email');
    const [query, setQuery] = useState('');
    const [image, setImage] = useState(null);
    const [consent, setConsent] = useState(false);

    const searchTypes = [
        { id: 'email', label: 'Email', icon: HiMail, placeholder: 'Enter email address...' },
        { id: 'phone', label: 'Phone', icon: HiPhone, placeholder: 'Enter phone number...' },
        { id: 'username', label: 'Username', icon: HiUser, placeholder: 'Enter username...' },
        { id: 'image', label: 'Image', icon: HiPhotograph, placeholder: '' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!consent) return;

        if (searchType === 'image') {
            onSearch({ type: 'image', file: image });
        } else {
            onSearch({ type: searchType, query });
        }
    };

    const isFormValid = consent && (searchType === 'image' ? !!image : query.length > 0);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card relative p-8 max-w-2xl w-full mx-auto overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -tr-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 -bl-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col space-y-8">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="inline-block mb-4"
                    >
                        <HiChip className="text-4xl text-neon-blue" />
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Intelligence Gathering</h2>
                    <p className="text-slate-400">Initialize a deep scan across the digital footprint landscape.</p>
                </div>

                {/* Search Type Selector */}
                <div className="grid grid-cols-4 gap-2 p-1 bg-cyber-darker/50 rounded-xl border border-white/5">
                    {searchTypes.map((type) => {
                        const Icon = type.icon;
                        const isActive = searchType === type.id;
                        return (
                            <button
                                key={type.id}
                                onClick={() => setSearchType(type.id)}
                                className={`relative flex flex-col items-center py-3 rounded-lg transition-all duration-300 ${isActive ? 'text-neon-blue' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Icon className="text-xl mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">{type.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-type"
                                        className="absolute inset-0 bg-neon-blue/10 border border-neon-blue/30 rounded-lg"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {searchType === 'image' ? (
                            <motion.div
                                key="image-upload"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <ImageUploader onImageSelect={setImage} selectedImage={image} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="text-input"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative group"
                            >
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={searchTypes.find(t => t.id === searchType).placeholder}
                                    className="w-full bg-cyber-darker/50 border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all placeholder:text-slate-600"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neon-blue transition-colors">
                                    {searchType === 'email' && <HiMail className="text-xl" />}
                                    {searchType === 'phone' && <HiPhone className="text-xl" />}
                                    {searchType === 'username' && <HiUser className="text-xl" />}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setConsent(!consent)}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${consent ? 'bg-neon-blue border-neon-blue shadow-[0_0_10px_#00f0ff]' : 'border-white/10 group-hover:border-neon-blue/50'
                            }`}>
                            {consent && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-sm text-slate-400 select-none group-hover:text-slate-200 transition-colors">
                            I certify that I have legal consent/authorization to scan this identifier.
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className={`w-full btn-cyber flex items-center justify-center space-y-0 space-x-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>{searchType === 'image' ? 'Analyzing Image...' : 'Initializing Pulse...'}</span>
                            </>
                        ) : (
                            <>
                                <HiLightningBolt className="text-xl" />
                                <span>START INTELLIGENCE SCAN</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Neon Border Glow */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-purple/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

export default SearchCard;
