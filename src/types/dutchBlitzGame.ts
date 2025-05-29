export interface DutchBlitzCard {
  id: string;
  color: 'red' | 'yellow' | 'blue' | 'green';
  number: number; // 1-10
  emoji: string;
  isPlayable: boolean;
  pile: 'blitz' | 'post' | 'dutch' | 'hand' | null;
  position: number; // position in pile
}

export interface DutchBlitzPlayer {
  id: string;
  name: string;
  score: number;
  cardsPlayed: number;
  blitzPile: DutchBlitzCard[];
  postPiles: DutchBlitzCard[][]; // 3 post piles
  dutchPile: DutchBlitzCard[];
  handCards: DutchBlitzCard[];
  reactionTime: number[];
  fluencyScore: number;
  commandsUsed: string[];
}

export interface DutchBlitzGameState {
  phase: 'setup' | 'playing' | 'grammar' | 'results';
  round: number;
  maxRounds: number;
  timeLimit: number; // seconds per round
  remainingTime: number;
  players: DutchBlitzPlayer[];
  currentPlayer: number;
  centerPiles: DutchBlitzCard[][]; // 4 center piles (one per color)
  gameLog: string[];
  score: {
    cardsPlayed: number;
    speedBonus: number;
    fluencyBonus: number;
    grammarBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  isGameActive: boolean;
  lastPlayTime: number;
  currentCommand: string | null;
}

export interface DutchBlitzGrammarExercise {
  id: string;
  type: 'imperative' | 'declarative' | 'numbers' | 'colors';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'speed' | 'fluency' | 'commands' | 'coordination';
}

export interface PlayEvent {
  id: string;
  playerId: string;
  cardId: string;
  fromPile: string;
  toPile: string;
  timestamp: number;
  reactionTime: number;
  command: string;
  isValid: boolean;
} 