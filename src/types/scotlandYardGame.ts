export interface ScotlandYardLocation {
  id: string;
  name: string;
  nameKorean: string;
  type: 'taxi' | 'bus' | 'subway' | 'boat';
  emoji: string;
  connections: string[]; // connected location IDs
  isRevealed: boolean;
  lastVisited?: number; // turn number
}

export interface ScotlandYardPlayer {
  id: string;
  name: string;
  role: 'detective' | 'criminal';
  currentLocation: string;
  tickets: {
    taxi: number;
    bus: number;
    subway: number;
    boat: number;
  };
  deductionPoints: number;
  communicationScore: number;
  movesHistory: string[];
}

export interface ScotlandYardGameState {
  phase: 'setup' | 'planning' | 'moving' | 'deduction' | 'grammar' | 'results';
  turn: number;
  maxTurns: number;
  players: ScotlandYardPlayer[];
  currentPlayer: number;
  locations: ScotlandYardLocation[];
  criminalLocation: string;
  criminalRevealed: boolean;
  lastRevealedTurn: number;
  gameLog: string[];
  score: {
    deductionPoints: number;
    cooperationBonus: number;
    grammarBonus: number;
    timeBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  isGameActive: boolean;
  criminalCaught: boolean;
  criminalEscaped: boolean;
}

export interface ScotlandYardGrammarExercise {
  id: string;
  type: 'imperative' | 'declarative' | 'expressing-ideas' | 'expressing-opinions';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'movement' | 'deduction' | 'cooperation' | 'planning';
}

export interface TransportRoute {
  from: string;
  to: string;
  type: 'taxi' | 'bus' | 'subway' | 'boat';
  cost: number;
}

export interface DeductionClue {
  id: string;
  type: 'location' | 'transport' | 'timing';
  description: string;
  descriptionKorean: string;
  isRevealed: boolean;
  turn: number;
} 