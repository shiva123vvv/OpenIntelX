import React from 'react';
import { HiShieldCheck, HiHeart } from 'react-icons/hi';
import { SiGithub, SiX, SiLinkedin } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/5 bg-cyber-darker/50 backdrop-blur-md pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                                <div className="w-full h-full rounded-lg bg-cyber-darker flex items-center justify-center">
                                    <span className="text-lg font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">X</span>
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-wider text-white">
                                OPEN<span className="text-neon-blue">INTEL</span>X
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-6">
                            Empowering ethical researchers with real-time digital footprint analysis and exposure detection engines.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-neon-blue/20 text-slate-400 hover:text-neon-blue transition-all">
                                <SiGithub className="text-xl" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-neon-blue/20 text-slate-400 hover:text-neon-blue transition-all">
                                <SiX className="text-xl" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-neon-blue/20 text-slate-400 hover:text-neon-blue transition-all">
                                <SiLinkedin className="text-xl" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">API Reference</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">OSINT Guides</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Status Node</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Ethical Charter</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm font-mono tracking-tighter flex items-center">
                        Built with <HiHeart className="mx-2 text-red-500 animate-pulse" /> for the Security Community
                    </p>
                    <div className="flex items-center space-x-2 text-slate-600 font-mono text-[10px] uppercase tracking-[0.2em]">
                        <HiShieldCheck className="text-neon-blue" />
                        <span>Encrypted Intelligence Protocol v2.4.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
