import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameLevel, GameStats } from '../types';
import { fetchTypingChallenge } from '../services/geminiService';
import { useTypingGame } from '../hooks/useTypingGame';
import TypingText from './TypingText';
import Stats from './Stats';
import Spinner from './Spinner';

interface GameScreenProps {
  level: GameLevel;
  onFinish: (stats: GameStats) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onFinish }) => {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    userInput,
    handleInputChange,
    reset,
    time,
    wpm,
  } = useTypingGame(text, onFinish);

  const loadChallenge = useCallback(async () => {
    setIsLoading(true);
    reset();
    const challenges = await fetchTypingChallenge(level);
    setText(challenges.join(' '));
    setIsLoading(false);
    inputRef.current?.focus();
  }, [level, reset]);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-lg shadow-lg">
        <Spinner />
        <p className="mt-4 text-cyan-300 animate-pulse">Generating your challenge...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center" onClick={handleContainerClick}>
      <Stats wpm={wpm} time={time} progress={(userInput.length / text.length) * 100} />
      <div className="mt-8 w-full p-6 md:p-8 bg-slate-800/70 rounded-lg text-2xl md:text-3xl leading-relaxed tracking-wider border-2 border-slate-700 shadow-xl relative">
        <TypingText text={text} userInput={userInput} />
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="absolute top-0 left-0 w-full h-full bg-transparent border-none outline-none opacity-0 cursor-default"
          autoFocus
          onBlur={() => inputRef.current?.focus()} // Keep focus on the input
        />
      </div>
       <div className="mt-6 text-sm text-slate-400">
        Click on the text or start typing to begin.
      </div>
    </div>
  );
};

export default GameScreen;
