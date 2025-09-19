import React from 'react';
import { GameStats } from '../types';

interface EndScreenProps {
  stats: GameStats;
  onRestart: () => void;
}

const StatItem: React.FC<{ label: string; value: string | number; colorClass: string }> = ({ label, value, colorClass }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg">
        <p className="text-sm text-slate-400">{label}</p>
        <p className={`font-orbitron text-4xl font-bold ${colorClass}`}>{value}</p>
    </div>
);


const EndScreen: React.FC<EndScreenProps> = ({ stats, onRestart }) => {
  return (
    <div className="bg-slate-800/50 p-8 rounded-lg shadow-2xl shadow-cyan-500/10 border border-slate-700 text-center animate-fadeIn">
      <h2 className="font-orbitron text-3xl font-bold text-cyan-300 mb-4">Challenge Complete!</h2>
      <p className="text-slate-400 mb-8">Here are your results:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatItem label="WPM" value={stats.wpm} colorClass="text-green-400" />
        <StatItem label="Accuracy" value={`${stats.accuracy}%`} colorClass="text-cyan-400" />
        <StatItem label="Time" value={`${stats.time}s`} colorClass="text-purple-400" />
      </div>

      <button
        onClick={onRestart}
        className="w-full md:w-auto bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;
