/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "cyber-darker": "#020617",
                "cyber-dark": "#0f172a",
                "cyber-slate": "#1e293b",
                "cyber-blue": "#00f0ff",
                "cyber-purple": "#7c3aed",
                "neon-blue": "#00f0ff",
                "neon-purple": "#7c3aed",
                "neon-pink": "#ff00ff"
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'scan': 'scan 2s linear infinite',
                'grid-flow': 'grid-flow 20s linear infinite'
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
                    '100%': { boxShadow: '0 0 20px #00f0ff, 0 0 30px #00f0ff' }
                },
                scan: {
                    '0%': { top: '0%' },
                    '100%': { top: '100%' }
                },
                'grid-flow': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(40px)' }
                }
            },
            backdropBlur: {
                xs: '2px'
            }
        }
    },
    plugins: []
}
