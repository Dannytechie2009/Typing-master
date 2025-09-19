import React from 'react';

interface StatsProps {
  wpm: number;
  time: number;
  progress: number;
}

const Stats: React.FC<StatsProps> = ({ wpm, time, progress }) => {
  return (
    <div className="w-full bg-slate-800/50 p-4 rounded-lg shadow-lg border border-slate-700">
        <div className="flex justify-around items-center text-center">
            <div className="w-1/3">
                <p className="text-sm text-slate-400">WPM</p>
                <p className="font-orbitron text-3xl font-bold text-green-400">{wpm}</p>
            </div>
            <div className="w-1/3 border-x-2 border-slate-700">
                <p className="text-sm text-slate-400">Time</p>
                <p className="font-orbitron text-3xl font-bold text-purple-400">{time.toFixed(1)}s</p>
            </div>
            <div className="w-1/3">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="font-orbitron text-3xl font-bold text-cyan-400">{Math.round(progress)}%</p>
            </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mt-4">
            <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}></div>
        </div>
    </div>
  );
};

export default Stats;
