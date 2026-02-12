import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Results from './pages/Results';
import HistoryPage from './pages/HistoryPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-darker text-slate-200 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />

        {/* Global background effects */}
        <div className="fixed inset-0 glow-mesh -z-10" />
      </div>
    </Router>
  );
}

export default App;
