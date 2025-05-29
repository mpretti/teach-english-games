export interface SandTimer {
  id: string;
  color: 'red' | 'blue' | 'purple' | 'yellow' | 'orange' | 'white';
  colorKorean: string;
  duration: number; // in seconds
  remainingTime: number;
  isActive: boolean;
  isFlipped: boolean;
  emoji: string;
}

export interface Kite {
  id: string;
  name: string;
  nameKorean: string;
  emoji: string;
  color: string;
  requiredTimers: string[]; // timer colors needed
  isFlying: boolean;
  altitude: number; // 0-100, higher is better
  windResistance: number; // how well it handles wind
  description: string;
  descriptionKorean: string;
}

export interface WindCondition {
  id: string;
  name: string;
  nameKorean: string;
  emoji: string;
  strength: number; // 1-5, higher is more challenging
  effect: string;
  effectKorean: string;
  duration: number; // in seconds
  remainingTime: number;
  isActive: boolean;
}

export interface KitesPlayer {
  id: string;
  name: string;
  assignedTimers: string[]; // timer IDs this player manages
  cooperationPoints: number;
  communicationScore: number;
  timeManagementScore: number;
}

export interface KitesGameState {
  phase: 'setup' | 'planning' | 'flying' | 'wind-event' | 'grammar' | 'results';
  round: number;
  maxRounds: number;
  timeLimit: number; // total game time in seconds
  remainingTime: number;
  players: KitesPlayer[];
  currentPlayer: number;
  sandTimers: SandTimer[];
  kites: Kite[];
  activeWindConditions: WindCondition[];
  gameLog: string[];
  score: {
    kitesFlying: number;
    timeBonus: number;
    cooperationBonus: number;
    grammarBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  isGameActive: boolean;
  lastFlipTime: number;
}

export interface KitesGrammarExercise {
  id: string;
  type: 'imperative' | 'possessive-pronouns' | 'immediate-plans' | 'expressing-desires' | 'questions';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'timer' | 'kite' | 'wind' | 'cooperation' | 'urgency';
}

export interface TimerAction {
  type: 'flip' | 'assign' | 'coordinate';
  playerId: string;
  timerId: string;
  targetKiteId?: string;
  timestamp: number;
}

export interface CooperationEvent {
  id: string;
  type: 'timer-sharing' | 'kite-rescue' | 'wind-coordination' | 'emergency-flip';
  description: string;
  descriptionKorean: string;
  playersInvolved: string[];
  successBonus: number;
  timeWindow: number; // seconds to complete
  isCompleted: boolean;
} 