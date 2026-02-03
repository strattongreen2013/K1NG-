
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const GamePage = ({ games, favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const game = games.find(g => g.id === id);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h2 className="text-3xl font-bold">Game Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(game.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400 text-sm font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-indigo-300">Games</Link>
            <span>/</span>
            <span>{game.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">{game.title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onToggleFavorite(game.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all ${
              isFavorite 
              ? 'bg-red-500/10 border-red-500/50 text-red-500' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z"/>
            </svg>
            <span className="font-bold">{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>
          
          <button 
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className={`p-2 rounded-xl border transition-all ${
              isTheaterMode 
              ? 'bg-indigo-500 text-white border-indigo-400' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Theater Mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 12h10"/></svg>
          </button>
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${isTheaterMode ? 'fixed inset-0 z-[100] bg-slate-950 p-4' : 'relative'}`}>
        {isTheaterMode && (
           <button 
             onClick={() => setIsTheaterMode(false)}
             className="absolute top-8 right-8 z-[110] bg-slate-800 hover:bg-slate-700 p-2 rounded-full text-slate-100 shadow-xl"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
           </button>
        )}
        <div className={`bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative ${isTheaterMode ? 'h-full' : 'aspect-video'}`}>
          <iframe 
            src={game.iframeUrl} 
            className="w-full h-full border-0"
            title={game.title}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allowFullScreen
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold">About {game.title}</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              {game.description}
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
               <div className="bg-slate-900 rounded-lg px-4 py-2 border border-slate-700 text-sm">
                  <span className="text-slate-500 mr-2">Category:</span>
                  <span className="text-indigo-400 font-bold">{game.category}</span>
               </div>
               <div className="bg-slate-900 rounded-lg px-4 py-2 border border-slate-700 text-sm">
                  <span className="text-slate-500 mr-2">Playability:</span>
                  <span className="text-green-400 font-bold">Instant (No Download)</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.7-2.9L15 13"/><path d="m5 11 4.5-4.5a2 2 0 0 1 2.8 0l3.1 3.1a2 2 0 0 1 0 2.8L11 17"/></svg>
            <span>Controls</span>
          </h3>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800">
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex justify-between items-center pb-2 border-b border-slate-700/50">
                <span>Action</span>
                <span className="bg-slate-900 px-2 py-1 rounded text-slate-200 border border-slate-700 font-mono">Mouse / Touch</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-slate-700/50">
                <span>Navigation</span>
                <span className="bg-slate-900 px-2 py-1 rounded text-slate-200 border border-slate-700 font-mono">WASD / Arrows</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Pause</span>
                <span className="bg-slate-900 px-2 py-1 rounded text-slate-200 border border-slate-700 font-mono">ESC / P</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-indigo-600/10 rounded-2xl p-6 border border-indigo-500/30">
            <h4 className="font-bold text-indigo-300 mb-2">Unblocked Access</h4>
            <p className="text-xs text-indigo-300/70 leading-relaxed">
              This game is served via direct CDN or open source proxies to ensure access on restricted networks. Please use responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
