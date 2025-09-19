import React, { useState, useCallback } from 'react';
import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { GameState, GameLevel, GameStats } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Menu);
  const [gameLevel, setGameLevel] = useState<GameLevel>(GameLevel.Easy);
  const [lastGameStats, setLastGameStats] = useState<GameStats | null>(null);

  const startGame = useCallback((level: GameLevel) => {
    setGameLevel(level);
    setGameState(GameState.Playing);
  }, []);

  const finishGame = useCallback((stats: GameStats) => {
    setLastGameStats(stats);
    setGameState(GameState.Finished);
  }, []);

  const restartGame = useCallback(() => {
    setLastGameStats(null);
    setGameState(GameState.Menu);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <GameScreen level={gameLevel} onFinish={finishGame} />;
      case GameState.Finished:
        return <EndScreen stats={lastGameStats!} onRestart={restartGame} />;
      case GameState.Menu:
      default:
        return <MenuScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-cyan-400 tracking-widest">
          TYPING MASTER
        </h1>
        <p className="text-slate-400 mt-2">Hone your keyboard skills. Engage AI-powered challenges.</p>
      </header>
      <main className="w-full max-w-5xl">
        {renderContent()}
      </main>
      <footer className="w-full max-w-5xl text-center mt-8 text-slate-500 text-sm">
        <p>Built with React, TypeScript, Tailwind CSS, and the Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
