export interface Vegetable {
  id: string;
  name: string;
  nameKorean: string;
  price: number;
  points: number;
  emoji: string;
  category: 'leafy' | 'root' | 'fruit' | 'other';
  countable: boolean;
}

export interface SaladRecipe {
  id: string;
  name: string;
  nameKorean: string;
  requiredVegetables: string[];
  bonusPoints: number;
  description: string;
  descriptionKorean: string;
}

export interface GameState {
  money: number;
  score: number;
  inventory: { [vegetableId: string]: number };
  completedSalads: string[];
  currentRound: number;
  totalRounds: number;
  gamePhase: 'shopping' | 'cooking' | 'results';
}

export interface GrammarExercise {
  id: string;
  type: 'singular-plural' | 'countable-uncountable' | 'future-tense' | 'articles' | 'expressions';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
} 