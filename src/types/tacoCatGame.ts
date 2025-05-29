export interface TacoCatCard {
  id: string;
  word: string;
  wordKorean: string;
  image: string;
  emoji: string;
  isSpecial: boolean;
}

export interface TacoCatPlayer {
  id: string;
  name: string;
  hand: TacoCatCard[];
  cardsWon: TacoCatCard[];
  reactionTime: number[];
  correctMatches: number;
  incorrectMatches: number;
}

export interface TacoCatGameState {
  phase: 'setup' | 'playing' | 'grammar' | 'results';
  players: TacoCatPlayer[];
  currentPlayer: number;
  centerPile: TacoCatCard[];
  currentWord: string;
  isGameActive: boolean;
  round: number;
  maxRounds: number;
  score: {
    cardsWon: number;
    reactionBonus: number;
    grammarBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  lastAction: string;
  gameStartTime: number;
}

export interface TacoCatGrammarExercise {
  id: string;
  type: 'vocabulary' | 'listening' | 'matching' | 'pronunciation';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'speed' | 'recognition' | 'memory';
  audioUrl?: string;
  imageUrl?: string;
} 