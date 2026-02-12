import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiFingerPrint, HiDatabase, HiClock } from 'react-icons/hi';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { title: 'Home', path: '/', icon: HiShieldCheck },
        { title: 'Search', path: '/search', icon: HiFingerPrint },
        { title: 'Results', path: '/results', icon: HiDatabase },
        { title: 'History', path: '/history', icon: HiClock },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                            <div className="w-full h-full rounded-xl bg-cyber-darker flex items-center justify-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">X</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-wider group-hover:text-neon-blue transition-colors">
                            OPEN<span className="text-neon-blue">INTEL</span>X
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative px-3 py-2 text-sm font-medium flex items-center space-x-2 group transition-colors"
                                >
                                    <item.icon className={`text-lg ${isActive ? 'text-neon-blue' : 'text-slate-400 group-hover:text-neon-blue'}`} />
                                    <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}>
                                        {item.title}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_10px_#00f0ff]"
                                            initial={false}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <button className="md:hidden text-slate-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
