import type { NoMercyCard, NoMercyCharacter, NoMercyGrammarExercise } from '../types/noMercyGame';

export const NO_MERCY_CARDS: NoMercyCard[] = [
  // Purple cards (1-10)
  { id: 'purple-1-1', number: 1, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-1-2', number: 1, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-2-1', number: 2, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-2-2', number: 2, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-3-1', number: 3, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-3-2', number: 3, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-4-1', number: 4, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-4-2', number: 4, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-5-1', number: 5, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-5-2', number: 5, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-6-1', number: 6, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-6-2', number: 6, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-7-1', number: 7, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-7-2', number: 7, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-8-1', number: 8, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-8-2', number: 8, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-9-1', number: 9, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-9-2', number: 9, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-10-1', number: 10, color: 'purple', emoji: '🟣', isRevealed: false },
  { id: 'purple-10-2', number: 10, color: 'purple', emoji: '🟣', isRevealed: false },

  // Yellow cards (1-10)
  { id: 'yellow-1-1', number: 1, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-1-2', number: 1, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-2-1', number: 2, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-2-2', number: 2, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-3-1', number: 3, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-3-2', number: 3, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-4-1', number: 4, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-4-2', number: 4, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-5-1', number: 5, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-5-2', number: 5, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-6-1', number: 6, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-6-2', number: 6, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-7-1', number: 7, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-7-2', number: 7, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-8-1', number: 8, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-8-2', number: 8, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-9-1', number: 9, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-9-2', number: 9, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-10-1', number: 10, color: 'yellow', emoji: '🟡', isRevealed: false },
  { id: 'yellow-10-2', number: 10, color: 'yellow', emoji: '🟡', isRevealed: false },

  // Red cards (1-10)
  { id: 'red-1-1', number: 1, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-1-2', number: 1, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-2-1', number: 2, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-2-2', number: 2, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-3-1', number: 3, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-3-2', number: 3, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-4-1', number: 4, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-4-2', number: 4, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-5-1', number: 5, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-5-2', number: 5, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-6-1', number: 6, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-6-2', number: 6, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-7-1', number: 7, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-7-2', number: 7, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-8-1', number: 8, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-8-2', number: 8, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-9-1', number: 9, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-9-2', number: 9, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-10-1', number: 10, color: 'red', emoji: '🔴', isRevealed: false },
  { id: 'red-10-2', number: 10, color: 'red', emoji: '🔴', isRevealed: false },

  // Brown cards (1-10)
  { id: 'brown-1-1', number: 1, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-1-2', number: 1, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-2-1', number: 2, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-2-2', number: 2, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-3-1', number: 3, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-3-2', number: 3, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-4-1', number: 4, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-4-2', number: 4, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-5-1', number: 5, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-5-2', number: 5, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-6-1', number: 6, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-6-2', number: 6, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-7-1', number: 7, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-7-2', number: 7, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-8-1', number: 8, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-8-2', number: 8, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-9-1', number: 9, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-9-2', number: 9, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-10-1', number: 10, color: 'brown', emoji: '🤎', isRevealed: false },
  { id: 'brown-10-2', number: 10, color: 'brown', emoji: '🤎', isRevealed: false },

  // Blue cards (1-10)
  { id: 'blue-1-1', number: 1, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-1-2', number: 1, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-2-1', number: 2, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-2-2', number: 2, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-3-1', number: 3, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-3-2', number: 3, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-4-1', number: 4, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-4-2', number: 4, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-5-1', number: 5, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-5-2', number: 5, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-6-1', number: 6, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-6-2', number: 6, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-7-1', number: 7, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-7-2', number: 7, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-8-1', number: 8, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-8-2', number: 8, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-9-1', number: 9, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-9-2', number: 9, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-10-1', number: 10, color: 'blue', emoji: '🔵', isRevealed: false },
  { id: 'blue-10-2', number: 10, color: 'blue', emoji: '🔵', isRevealed: false },
];

export const NO_MERCY_CHARACTERS: NoMercyCharacter[] = [
  {
    id: 'sheriff',
    name: 'Sheriff',
    nameKorean: '보안관',
    type: 'sheriff',
    emoji: '🤠',
    description: 'Protects the town and enforces the law',
    descriptionKorean: '마을을 보호하고 법을 집행합니다'
  },
  {
    id: 'deputy',
    name: 'Deputy',
    nameKorean: '부보안관',
    type: 'deputy',
    emoji: '👮',
    description: 'Helps the sheriff maintain order',
    descriptionKorean: '보안관이 질서를 유지하도록 돕습니다'
  },
  {
    id: 'outlaw-1',
    name: 'Outlaw',
    nameKorean: '무법자',
    type: 'outlaw',
    emoji: '🤡',
    description: 'Causes trouble and breaks the law',
    descriptionKorean: '문제를 일으키고 법을 어깁니다'
  },
  {
    id: 'outlaw-2',
    name: 'Bandit',
    nameKorean: '강도',
    type: 'outlaw',
    emoji: '🎭',
    description: 'Robs banks and causes chaos',
    descriptionKorean: '은행을 털고 혼란을 일으킵니다'
  },
  {
    id: 'renegade',
    name: 'Renegade',
    nameKorean: '배신자',
    type: 'renegade',
    emoji: '🎪',
    description: 'Works alone with mysterious motives',
    descriptionKorean: '신비로운 동기로 혼자 일합니다'
  }
];

export const NO_MERCY_GRAMMAR_EXERCISES: NoMercyGrammarExercise[] = [
  {
    id: 'nm-grammar-1',
    type: 'numbers',
    question: "What number comes between 4 and 6?",
    questionKorean: "4와 6 사이에 오는 숫자는?",
    options: ['three', 'five', 'seven', 'eight'],
    correctAnswer: 1,
    explanation: "Five comes between four and six.",
    explanationKorean: "5는 4와 6 사이에 옵니다.",
    points: 5,
    context: 'banking'
  },
  {
    id: 'nm-grammar-2',
    type: 'colors',
    question: "Complete: 'I'm revealing the ___ card.'",
    questionKorean: "'I'm revealing the ___ card.'를 완성하세요.",
    options: ['number', 'purple', 'many', 'some'],
    correctAnswer: 1,
    explanation: "Colors describe the appearance of cards.",
    explanationKorean: "색깔은 카드의 외관을 설명합니다.",
    points: 10,
    context: 'stopping'
  },
  {
    id: 'nm-grammar-3',
    type: 'declarative',
    question: "How do you announce you're stopping?",
    questionKorean: "멈춘다고 어떻게 발표하나요?",
    options: [
      "Stop the game!",
      "I'm stopping",
      "You should stop",
      "Stop it now"
    ],
    correctAnswer: 1,
    explanation: "Use 'I'm + verb + ing' to announce your decision.",
    explanationKorean: "'I'm + 동사 + ing'를 사용하여 결정을 발표합니다.",
    points: 15,
    context: 'stopping'
  },
  {
    id: 'nm-grammar-4',
    type: 'declarative',
    question: "How do you announce you're banking your cards?",
    questionKorean: "카드를 저축한다고 어떻게 발표하나요?",
    options: [
      "Bank the cards!",
      "I'm banking",
      "You bank them",
      "Banking is good"
    ],
    correctAnswer: 1,
    explanation: "'I'm banking' announces your current action.",
    explanationKorean: "'I'm banking'은 현재 행동을 발표합니다.",
    points: 15,
    context: 'banking'
  },
  {
    id: 'nm-grammar-5',
    type: 'declarative',
    question: "How do you announce you're stealing cards?",
    questionKorean: "카드를 훔친다고 어떻게 발표하나요?",
    options: [
      "Steal the cards!",
      "I'm stealing",
      "You steal them",
      "Stealing happens"
    ],
    correctAnswer: 1,
    explanation: "'I'm stealing' announces your risky action.",
    explanationKorean: "'I'm stealing'은 위험한 행동을 발표합니다.",
    points: 20,
    context: 'stealing'
  },
  {
    id: 'nm-grammar-6',
    type: 'probability',
    question: "What does 'chicken out' mean?",
    questionKorean: "'chicken out'은 무슨 뜻인가요?",
    options: [
      "To be brave",
      "To quit because of fear",
      "To win the game",
      "To help others"
    ],
    correctAnswer: 1,
    explanation: "'Chicken out' means to quit because you're scared.",
    explanationKorean: "'Chicken out'은 무서워서 그만둔다는 뜻입니다.",
    points: 15,
    context: 'conservation'
  },
  {
    id: 'nm-grammar-7',
    type: 'risk-management',
    question: "What does 'bust' mean in this game?",
    questionKorean: "이 게임에서 'bust'는 무슨 뜻인가요?",
    options: [
      "To win big",
      "To reveal two cards of the same number and color",
      "To help someone",
      "To start over"
    ],
    correctAnswer: 1,
    explanation: "'Bust' means revealing two identical cards and losing.",
    explanationKorean: "'Bust'는 같은 카드 두 장을 공개하여 지는 것을 의미합니다.",
    points: 20,
    context: 'conservation'
  }
];

export const DIFFICULTY_SETTINGS = {
  easy: {
    bustThreshold: 2, // Need 2 identical cards to bust
    maxCards: 6,
    grammarFrequency: 0.2,
    characterSelectionTime: 30000 // 30 seconds
  },
  medium: {
    bustThreshold: 2,
    maxCards: 8,
    grammarFrequency: 0.3,
    characterSelectionTime: 20000 // 20 seconds
  },
  hard: {
    bustThreshold: 2,
    maxCards: 10,
    grammarFrequency: 0.4,
    characterSelectionTime: 15000 // 15 seconds
  }
}; 