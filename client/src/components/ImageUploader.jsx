import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCloudUpload, HiX, HiCheckCircle } from 'react-icons/hi';

const ImageUploader = ({ onImageSelect, selectedImage }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(selectedImage ? URL.createObjectURL(selectedImage) : null);
    const [fileSize, setFileSize] = useState(selectedImage ? (selectedImage.size / (1024 * 1024)).toFixed(2) : '0');
    const [error, setError] = useState('');

    const handleFile = useCallback((file) => {
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            setError('Invalid file type. Please upload a JPG or PNG.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size too large. Max 5MB allowed.');
            return;
        }

        setError('');
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setFileSize((file.size / (1024 * 1024)).toFixed(2));
        onImageSelect(file);
    }, [onImageSelect]);

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const removeImage = () => {
        setPreview(null);
        setFileSize('0');
        onImageSelect(null);
        setError('');
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!preview ? (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center space-y-4
              ${isDragging ? 'border-neon-blue bg-neon-blue/5' : 'border-slate-700/50 hover:border-neon-blue/50 hover:bg-white/5'}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}
                        onClick={() => document.getElementById('image-upload-input').click()}
                    >
                        <input
                            id="image-upload-input"
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={onChange}
                        />

                        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <HiCloudUpload className="text-3xl text-neon-blue" />
                        </div>

                        <div className="text-center">
                            <p className="text-lg font-medium text-slate-200">Drag & drop or <span className="text-neon-blue">browse</span></p>
                            <p className="text-sm text-slate-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm mt-2"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group rounded-2xl overflow-hidden border border-neon-blue/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                    >
                        <img src={preview} alt="Preview" className="w-full h-64 object-cover" />

                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent to-transparent opacity-60" />

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-neon-blue font-mono uppercase tracking-widest">Image Loaded ({fileSize} MB)</span>
                                <span className="text-sm font-medium text-white">Ready for scanning</span>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg backdrop-blur-md transition-colors"
                                title="Remove image"
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        <div className="absolute top-4 right-4">
                            <HiCheckCircle className="text-neon-blue text-2xl drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                        </div>

                        {/* Scanning Line Effect */}
                        <motion.div
                            className="absolute left-0 right-0 h-1 bg-neon-blue/50 shadow-[0_0_15px_#00f0ff] z-10"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageUploader;
