import React from 'react';
import { GameLevel } from '../types';

interface MenuScreenProps {
  onStart: (level: GameLevel) => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-slate-800/50 p-8 rounded-lg shadow-2xl shadow-cyan-500/10 border border-slate-700 text-center animate-fadeIn">
      <h2 className="font-orbitron text-3xl font-bold text-cyan-300 mb-4">Select Difficulty</h2>
      <p className="text-slate-400 mb-8">Choose a level to begin your training.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.values(GameLevel) as GameLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => onStart(level)}
            className="w-full bg-slate-700 text-cyan-300 font-bold py-3 px-6 rounded-md hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuScreen;
