export enum GameState {
  Menu,
  Playing,
  Finished,
}

export enum GameLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Proverbs = 'Proverbs',
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  time: number;
}

export interface CharacterState {
  char: string;
  state: 'default' | 'correct' | 'incorrect' | 'current';
}
