export interface TwinItCard {
  id: string;
  pattern: string;
  color: string;
  shape: string;
  emoji: string;
  isMatched: boolean;
  isVisible: boolean;
  matchedBy?: string; // player ID who found the match
}

export interface TwinItPlayer {
  id: string;
  name: string;
  score: number;
  matchesFound: number;
  reactionTime: number[];
  communicationScore: number;
}

export interface TwinItGameState {
  phase: 'setup' | 'playing' | 'grammar' | 'results';
  round: number;
  maxRounds: number;
  timeLimit: number; // seconds per round
  remainingTime: number;
  players: TwinItPlayer[];
  currentPlayer: number;
  visibleCards: TwinItCard[];
  allCards: TwinItCard[];
  currentMatch: {
    card1: TwinItCard | null;
    card2: TwinItCard | null;
    foundBy: string | null;
    timestamp: number;
  } | null;
  gameLog: string[];
  score: {
    matchesFound: number;
    speedBonus: number;
    grammarBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  isGameActive: boolean;
  lastMatchTime: number;
}

export interface TwinItGrammarExercise {
  id: string;
  type: 'simple-past' | 'accomplishments' | 'achievements' | 'declarative';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'found' | 'match' | 'speed' | 'pattern';
}

export interface MatchEvent {
  id: string;
  card1Id: string;
  card2Id: string;
  playerId: string;
  timestamp: number;
  reactionTime: number;
  isCorrect: boolean;
} 