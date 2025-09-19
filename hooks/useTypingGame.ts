import { useState, useEffect, useCallback, useRef } from 'react';
import { GameStats } from '../types';

export const useTypingGame = (text: string, onFinish: (stats: GameStats) => void) => {
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState<number>(0);
  const totalChars = text.length;
  const isFinished = userInput.length === totalChars;
  
  const timerId = useRef<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);


  const reset = useCallback(() => {
    setUserInput('');
    setStartTime(null);
    setErrors(0);
    setCurrentTime(0);
    if(timerId.current) {
        clearInterval(timerId.current)
    }
  }, []);

  const handleInputChange = (value: string) => {
    if (isFinished) return;

    if (!startTime) {
      const now = Date.now();
      setStartTime(now);
      timerId.current = window.setInterval(() => {
          setCurrentTime(Date.now() - now);
      }, 100);
    }
    
    const lastCharTyped = value.slice(-1);
    const expectedChar = text[value.length - 1];

    if(lastCharTyped !== expectedChar){
        setErrors(prev => prev + 1);
    }

    setUserInput(value);
  };
  
  useEffect(() => {
    if (isFinished) {
      const endTime = Date.now();
      if(timerId.current) {
        clearInterval(timerId.current);
      }
      if (startTime) {
        const durationSeconds = (endTime - startTime) / 1000;
        const wordsTyped = totalChars / 5;
        const wpm = Math.round((wordsTyped / durationSeconds) * 60);
        const accuracy = Math.round(((totalChars - errors) / totalChars) * 100);
        
        onFinish({
          wpm: wpm > 0 ? wpm : 0,
          accuracy: accuracy > 0 ? accuracy : 0,
          time: parseFloat(durationSeconds.toFixed(2)),
        });
      }
    }
  }, [isFinished, startTime, totalChars, errors, onFinish]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);


  return {
    userInput,
    handleInputChange,
    reset,
    errors,
    isFinished,
    time: parseFloat((currentTime / 1000).toFixed(2)),
    wpm: calculateWpm(userInput.length, currentTime),
  };
};

const calculateWpm = (charsTyped: number, timeMs: number) => {
    if (timeMs === 0) return 0;
    const wordsTyped = charsTyped / 5;
    const minutes = timeMs / 1000 / 60;
    return Math.round(wordsTyped / minutes);
}
