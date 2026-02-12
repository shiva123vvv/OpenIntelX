import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchCard from '../components/SearchCard';
import { searchOSINT } from '../services/api';

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async ({ type, query, file }) => {
        setIsLoading(true);
        setError(null);
        try {
            // Use query for text searches, file for image searches
            const searchValue = type === 'image' ? file : query;
            const data = await searchOSINT(type, searchValue, true);

            // Navigate to results page with the data
            navigate('/results', { state: { results: data, searchInfo: { type, value: type === 'image' ? 'Image File' : query } } });
        } catch (err) {
            setError(err.response?.data?.message || 'Deep scan failed. Please check your connection and try again.');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            {/* Background decorations */}
            <div className="fixed inset-0 glow-mesh" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        Target <span className="text-neon-blue">Initialization</span>
                    </h1>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        Input the identifier you wish to analyze. Our engines will bridge multiple data nodes to aggregate exposure metadata.
                    </p>
                </motion.div>

                <SearchCard onSearch={handleSearch} isLoading={isLoading} />

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
                    >
                        <p className="text-red-400 font-medium">{error}</p>
                    </motion.div>
                )}

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="flex items-center justify-center space-x-8 text-slate-600 font-mono text-[10px] tracking-widest uppercase">
                        <span>Server: Global-01A</span>
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span>Latency: 24ms</span>
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span>Nodes: 3,492 Active</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Search;
