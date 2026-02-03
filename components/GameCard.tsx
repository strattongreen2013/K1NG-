
import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <Link to={`/game/${game.id}`} className="block">
        <div className="aspect-video w-full overflow-hidden bg-slate-900">
          <img 
            src={game.thumbnail} 
            alt={game.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          />
        </div>
      </Link>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 mb-1 block">
              {game.category}
            </span>
            <Link to={`/game/${game.id}`}>
              <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                {game.title}
              </h3>
            </Link>
          </div>
          <button 
            onClick={() => onToggleFavorite(game.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite ? 'text-red-500 bg-red-500/10' : 'text-slate-500 hover:text-slate-300 bg-slate-700/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z"/>
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
      
      <div className="absolute top-2 left-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">PLAY NOW</span>
      </div>
    </div>
  );
};

export default GameCard;
