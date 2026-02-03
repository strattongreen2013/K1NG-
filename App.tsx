
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import GamePage from './pages/GamePage.tsx';

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nexus-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('./games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load games:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-indigo-500 animate-pulse text-xl font-bold">LOADING NEXUS...</div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                NEXUS GAMES
              </span>
            </Link>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              <span className="text-slate-700">|</span>
              <div className="flex items-center space-x-1 text-slate-400">
                <span>{favorites.length} Favorites</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage games={games} favorites={favorites} onToggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/game/:id" 
              element={<GamePage games={games} favorites={favorites} onToggleFavorite={toggleFavorite} />} 
            />
          </Routes>
        </main>

        <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Nexus Games. High-speed unblocked gaming.
            </p>
            <div className="flex justify-center space-x-6 text-xs text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
