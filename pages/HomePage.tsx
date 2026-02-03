
import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import GameCard from '../components/GameCard';

const HomePage = ({ games, favorites, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(Category.ALL);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === Category.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section className="relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Infinite Fun, <br />
            <span className="text-indigo-400">Zero Blockades.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Discover a curated universe of web-based games. Fast, secure, and always available. No downloads required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search for a game..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <div className="w-2 h-6 bg-indigo-500 rounded-full" />
            <span>Browse Categories</span>
          </h2>
          <span className="text-slate-500 text-sm font-medium">{filteredGames.length} Games Found</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <p className="text-slate-500 font-medium">No games found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory(Category.ALL); }}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-bold uppercase tracking-widest"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
