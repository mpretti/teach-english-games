export interface NoMercyCard {
  id: string;
  number: number;
  color: 'purple' | 'yellow' | 'red' | 'brown' | 'blue' | 'orange' | 'grey' | 'pink' | 'green' | 'black';
  emoji: string;
  isRevealed: boolean;
}

export interface NoMercyCharacter {
  id: string;
  name: string;
  nameKorean: string;
  type: 'sheriff' | 'outlaw' | 'deputy' | 'renegade';
  emoji: string;
  description: string;
  descriptionKorean: string;
}

export interface NoMercyPlayer {
  id: string;
  name: string;
  character: NoMercyCharacter | null;
  hand: NoMercyCard[];
  revealedCards: NoMercyCard[];
  isBanking: boolean;
  isStopping: boolean;
  isStealing: boolean;
  hasChickenedOut: boolean;
  hasBusted: boolean;
  score: number;
  reactionTime: number[];
}

export interface NoMercyGameState {
  phase: 'setup' | 'character-selection' | 'playing' | 'grammar' | 'results';
  players: NoMercyPlayer[];
  currentPlayer: number;
  deck: NoMercyCard[];
  discardPile: NoMercyCard[];
  availableCharacters: NoMercyCharacter[];
  isGameActive: boolean;
  round: number;
  maxRounds: number;
  score: {
    cardsRevealed: number;
    riskBonus: number;
    grammarBonus: number;
    characterBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  lastAction: string;
  gameStartTime: number;
  bustThreshold: number;
}

export interface NoMercyGrammarExercise {
  id: string;
  type: 'numbers' | 'colors' | 'probability' | 'risk-management' | 'declarative';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'banking' | 'stopping' | 'stealing' | 'conservation';
} 