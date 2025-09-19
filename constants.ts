import { GameLevel } from './types';

export const LEVEL_PROMPTS: Record<GameLevel, string> = {
  [GameLevel.Easy]: 'Generate an array of 20 common English words, each between 3 and 5 letters long. Return as a JSON array of strings.',
  [GameLevel.Medium]: 'Generate an array of 15 common English words, each between 6 and 8 letters long. Return as a JSON array of strings.',
  [GameLevel.Hard]: 'Generate an array of 10 simple English sentences, each with 5 to 8 words. Do not use complex punctuation. Return as a JSON array of strings.',
  [GameLevel.Proverbs]: 'Generate an array of 5 interesting English proverbs or famous quotes. Return as a JSON array of strings.',
};
